import React, { Component } from "react";
import io from "socket.io-client";
import "./meeting.css";
import {
  FaVideo,
  FaVideoSlash,
  FaMicrophone,
  FaMicrophoneSlash,
} from "react-icons/fa";
import {
  MdScreenShare,
  MdStopScreenShare,
  MdCallEnd,
  MdChat,
} from "react-icons/md";
import { IoSend } from "react-icons/io5";
import HeaderMeeting from "./headerMeeting";
const server_url = "https://video.sebastienbiollo.com";
var connections = {};
const peerConnectionConfig = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};
var socket = null;
var socketId = null;
var elms = 0;
const userLogin = localStorage.getItem("userLogin");
const user = userLogin ? JSON.parse(userLogin).username : "";
class Meeting extends Component {
  constructor(props) {
    super(props);
    this.localVideoref = React.createRef();
    this.videoAvailable = false;
    this.audioAvailable = false;
    this.state = {
      video: false,
      audio: false,
      screen: false,
      showModal: false,
      screenAvailable: false,
      messages: [],
      message: "",
      newmessages: 0,
      askForUsername: true,
      username: user,
    };
    connections = {};
    this.getPermissions();
  }

  getPermissions = async () => {
    try {
      await navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(() => (this.videoAvailable = true))
        .catch(() => (this.videoAvailable = false));
      await navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(() => (this.audioAvailable = true))
        .catch(() => (this.audioAvailable = false));
      if (navigator.mediaDevices.getDisplayMedia) {
        this.setState({ screenAvailable: true });
      } else {
        this.setState({ screenAvailable: false });
      }
      if (this.videoAvailable || this.audioAvailable) {
        navigator.mediaDevices
          .getUserMedia({
            video: this.videoAvailable,
            audio: this.audioAvailable,
          })
          .then((stream) => {
            window.localStream = stream;
            this.localVideoref.current.srcObject = stream;
          })
          .then((stream) => {})
          .catch((e) => console.log(e));
      }
    } catch (e) {
      console.log(e);
    }
  };

  getMedia = () => {
    this.setState(
      {
        video: this.videoAvailable,
        audio: this.audioAvailable,
      },
      () => {
        this.getUserMedia();
        this.connectToSocketServer();
      }
    );
  };

  getUserMedia = () => {
    if (
      (this.state.video && this.videoAvailable) ||
      (this.state.audio && this.audioAvailable)
    ) {
      navigator.mediaDevices
        .getUserMedia({ video: this.state.video, audio: this.state.audio })
        .then(this.getUserMediaSuccess)
        .then((stream) => {})
        .catch((e) => console.log(e));
    } else {
      try {
        let tracks = this.localVideoref.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      } catch (e) {}
    }
  };

  getUserMediaSuccess = (stream) => {
    try {
      window.localStream.getTracks().forEach((track) => track.stop());
    } catch (e) {
      console.log(e);
    }

    window.localStream = stream;
    this.localVideoref.current.srcObject = stream;

    for (let id in connections) {
      if (id === socketId) continue;

      connections[id].addStream(window.localStream);
      // eslint-disable-next-line
      connections[id].createOffer().then((description) => {
        connections[id]
          .setLocalDescription(description)
          .then(() => {
            socket.emit(
              "signal",
              id,
              JSON.stringify({ sdp: connections[id].localDescription })
            );
          })
          .catch((e) => console.log(e));
      });
    }

    stream.getTracks().forEach(
      (track) =>
        (track.onended = () => {
          this.setState(
            {
              video: false,
              audio: false,
            },
            () => {
              try {
                let tracks = this.localVideoref.current.srcObject.getTracks();
                tracks.forEach((track) => track.stop());
              } catch (e) {
                console.log(e);
              }
              let blackSilence = (...args) =>
                new MediaStream([this.black(...args), this.silence()]);
              window.localStream = blackSilence();
              this.localVideoref.current.srcObject = window.localStream;

              for (let id in connections) {
                connections[id].addStream(window.localStream);
                // eslint-disable-next-line
                connections[id].createOffer().then((description) => {
                  connections[id]
                    .setLocalDescription(description)
                    .then(() => {
                      socket.emit(
                        "signal",
                        id,
                        JSON.stringify({
                          sdp: connections[id].localDescription,
                        })
                      );
                    })
                    .catch((e) => console.log(e));
                });
              }
            }
          );
        })
    );
  };

  getDislayMedia = () => {
    if (this.state.screen) {
      if (navigator.mediaDevices.getDisplayMedia) {
        navigator.mediaDevices
          .getDisplayMedia({ video: true, audio: true })
          .then(this.getDislayMediaSuccess)
          .then((stream) => {})
          .catch((e) => console.log(e));
      }
    }
  };

  getDislayMediaSuccess = (stream) => {
    try {
      window.localStream.getTracks().forEach((track) => track.stop());
    } catch (e) {
      console.log(e);
    }
    window.localStream = stream;
    this.localVideoref.current.srcObject = stream;
    for (let id in connections) {
      if (id === socketId) continue;
      connections[id].addStream(window.localStream);
      // eslint-disable-next-line
      connections[id].createOffer().then((description) => {
        connections[id]
          .setLocalDescription(description)
          .then(() => {
            socket.emit(
              "signal",
              id,
              JSON.stringify({ sdp: connections[id].localDescription })
            );
          })
          .catch((e) => console.log(e));
      });
    }

    stream.getTracks().forEach(
      (track) =>
        (track.onended = () => {
          this.setState(
            {
              screen: false,
            },
            () => {
              try {
                let tracks = this.localVideoref.current.srcObject.getTracks();
                tracks.forEach((track) => track.stop());
              } catch (e) {
                console.log(e);
              }

              let blackSilence = (...args) =>
                new MediaStream([this.black(...args), this.silence()]);
              window.localStream = blackSilence();
              this.localVideoref.current.srcObject = window.localStream;
              this.getUserMedia();
            }
          );
        })
    );
  };

  gotMessageFromServer = (fromId, message) => {
    var signal = JSON.parse(message);
    if (fromId !== socketId) {
      if (signal.sdp) {
        connections[fromId]
          .setRemoteDescription(new RTCSessionDescription(signal.sdp))
          .then(() => {
            if (signal.sdp.type === "offer") {
              connections[fromId]
                .createAnswer()
                .then((description) => {
                  connections[fromId]
                    .setLocalDescription(description)
                    .then(() => {
                      socket.emit(
                        "signal",
                        fromId,
                        JSON.stringify({
                          sdp: connections[fromId].localDescription,
                        })
                      );
                    })
                    .catch((e) => console.log(e));
                })
                .catch((e) => console.log(e));
            }
          })
          .catch((e) => console.log(e));
      }

      if (signal.ice) {
        connections[fromId]
          .addIceCandidate(new RTCIceCandidate(signal.ice))
          .catch((e) => console.log(e));
      }
    }
  };

  changeCssVideos = (main) => {
    let widthMain = main.offsetWidth;
    let minWidth = "30%";
    if ((widthMain * 30) / 100 < 300) {
      minWidth = "300px";
    }
    let minHeight = "40%";

    let height = String(100 / elms) + "%";
    let width = "";
    if (elms === 0 || elms === 1) {
      width = "100%";
      height = "100%";
    } else if (elms === 2) {
      width = "45%";
      height = "100%";
    } else if (elms === 3 || elms === 4) {
      width = "35%";
      height = "50%";
    } else {
      width = String(100 / elms) + "%";
    }
    let videos = main.querySelectorAll("video");
    for (let a = 0; a < videos.length; ++a) {
      videos[a].style.minWidth = minWidth;
      videos[a].style.minHeight = minHeight;
      videos[a].style.setProperty("width", width);
      videos[a].style.setProperty("height", height);
    }
    return { minWidth, minHeight, width, height };
  };

  connectToSocketServer = () => {
    socket = io.connect(server_url, { secure: true });
    socket.on("signal", this.gotMessageFromServer);
    socket.on("connect", () => {
      socket.emit("join-call", window.location.href);
      socketId = socket.id;
      socket.on("chat-message", this.addMessage);
      socket.on("user-left", (id) => {
        let video = document.querySelector(`[data-socket="${id}"]`);
        if (video !== null) {
          elms--;
          video.parentNode.removeChild(video);
          let main = document.getElementById("main");
          this.changeCssVideos(main);
        }
      });
      socket.on("user-joined", (id, clients) => {
        clients.forEach((socketListId) => {
          connections[socketListId] = new RTCPeerConnection(
            peerConnectionConfig
          );
          // Wait for their ice candidate
          connections[socketListId].onicecandidate = function (event) {
            if (event.candidate != null) {
              socket.emit(
                "signal",
                socketListId,
                JSON.stringify({ ice: event.candidate })
              );
            }
          };
          connections[socketListId].onaddstream = (event) => {
            var searchVidep = document.querySelector(
              `[data-socket="${socketListId}"]`
            );
            if (searchVidep !== null) {
              searchVidep.srcObject = event.stream;
            } else {
              elms = clients.length;
              let main = document.getElementById("main");
              let cssMesure = this.changeCssVideos(main);
              let video = document.createElement("video");
              let css = {
                minWidth: cssMesure.minWidth,
                minHeight: cssMesure.minHeight,
                maxHeight: "100%",
                margin: "10px",
                borderRadius: "8px",
                boxShadow:
                  " 0px 1px 3px 0px rgb(60 64 67 / 30%), 0px 4px 8px 3px rgb(60 64 67 / 15%)",
                background: "#4A4E51",
                objectFit: "fill",
              };
              for (let i in css) video.style[i] = css[i];
              video.style.setProperty("width", cssMesure.width);
              video.style.setProperty("height", cssMesure.height);
              video.setAttribute("data-socket", socketListId);
              video.srcObject = event.stream;
              video.autoplay = true;
              video.playsinline = true;
              main.appendChild(video);
            }
          };
          if (window.localStream !== undefined && window.localStream !== null) {
            connections[socketListId].addStream(window.localStream);
          } else {
            let blackSilence = (...args) =>
              new MediaStream([this.black(...args), this.silence()]);
            window.localStream = blackSilence();
            connections[socketListId].addStream(window.localStream);
          }
        });
        if (id === socketId) {
          for (let id2 in connections) {
            if (id2 === socketId) continue;
            try {
              connections[id2].addStream(window.localStream);
            } catch (e) {}
            // eslint-disable-next-line
            connections[id2].createOffer().then((description) => {
              connections[id2]
                .setLocalDescription(description)
                .then(() => {
                  socket.emit(
                    "signal",
                    id2,
                    JSON.stringify({ sdp: connections[id2].localDescription })
                  );
                })
                .catch((e) => console.log(e));
            });
          }
        }
      });
    });
  };

  silence = () => {
    let ctx = new AudioContext();
    let oscillator = ctx.createOscillator();
    let dst = oscillator.connect(ctx.createMediaStreamDestination());
    oscillator.start();
    ctx.resume();
    return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });
  };
  black = ({ width = 640, height = 480 } = {}) => {
    let canvas = Object.assign(document.createElement("canvas"), {
      width,
      height,
    });
    canvas.getContext("2d").fillRect(0, 0, width, height);
    let stream = canvas.captureStream();
    return Object.assign(stream.getVideoTracks()[0], { enabled: false });
  };

  handleVideo = () =>
    this.setState({ video: !this.state.video }, () => this.getUserMedia());
  handleAudio = () =>
    this.setState({ audio: !this.state.audio }, () => this.getUserMedia());
  handleScreen = () =>
    this.setState({ screen: !this.state.screen }, () => this.getDislayMedia());
  handleEndCall = () => {
    try {
      let tracks = this.localVideoref.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    } catch (e) {}
    window.location.href = "/";
  };

  openChat = () => this.setState({ showModal: !this.state.showModal });
  handleMessage = (e) => this.setState({ message: e.target.value });

  addMessage = (data, sender, socketIdSender) => {
    this.setState((prevState) => ({
      messages: [...prevState.messages, { sender: sender, data: data }],
    }));
    if (socketIdSender !== socketId) {
      this.setState({ newmessages: this.state.newmessages + 1 });
    }
  };
  // handleUsername = (e) => this.setState({ username: e.target.value });
  sendMessage = () => {
    socket.emit("chat-message", this.state.message, this.state.username);
    this.setState({ message: "", sender: this.state.username });
  };
  connect = () =>
    this.setState({ askForUsername: false }, () => this.getMedia());
  isChrome = function () {
    let userAgent = (navigator && (navigator.userAgent || "")).toLowerCase();
    let vendor = (navigator && (navigator.vendor || "")).toLowerCase();
    let matchChrome = /google inc/.test(vendor)
      ? userAgent.match(/(?:chrome|crios)\/(\d+)/)
      : null;
    return matchChrome !== null;
  };

  render() {
    if (this.isChrome() === false) {
      return <h1>Sorry...</h1>;
    }
    return (
      <div div style={{ background: "#18191A" }}>
        {this.state.askForUsername === true ? (
          <div>
            <input
              type="text"
              placeholder="Username"
              value={this.state.username}
              // onChange={(e) => this.handleUsername(e)}
            />
            <button
              onLoad={this.setState({ askForUsername: false }, () =>
                this.getMedia()
              )}
              style={{ margin: "20px" }}
            >
              Connect
            </button>
          </div>
        ) : (
          <>
            <HeaderMeeting />
            <div
              className="btn-down"
              style={{
                backgroundColor: "#242526",
                color: "whitesmoke",
                textAlign: "center",
              }}
            >
              <button style={{ color: "#424242" }} onClick={this.handleVideo}>
                {this.state.video === true ? <FaVideo /> : <FaVideoSlash />}
              </button>
              <button style={{ color: "#f44336" }} onClick={this.handleEndCall}>
                <MdCallEnd />
              </button>
              <button style={{ color: "#424242" }} onClick={this.handleAudio}>
                {this.state.audio === true ? (
                  <FaMicrophone />
                ) : (
                  <FaMicrophoneSlash />
                )}
              </button>
              {this.state.screenAvailable === true ? (
                <button
                  style={{ color: "#424242" }}
                  onClick={this.handleScreen}
                >
                  {this.state.screen === true ? (
                    <MdScreenShare />
                  ) : (
                    <MdStopScreenShare />
                  )}
                </button>
              ) : null}
              <span
                className="MuiBadge-root"
                color="secondary"
                onClick={this.openChat}
              >
                <button style={{ color: "#424242" }} onClick={this.openChat}>
                  <MdChat />
                </button>
                <span className="MuiBadge-anchor">
                  {this.state.newmessages}
                </span>
              </span>
            </div>
            <div className="container">
              <div
                id="main"
                className="flex-container"
                style={{ margin: 0, padding: 0 }}
              >
                <video
                  id="my-video"
                  ref={this.localVideoref}
                  autoPlay
                  muted
                  style={{
                    borderRadius: "8px",
                    boxShadow:
                      " 0px 1px 3px 0px rgb(60 64 67 / 30%), 0px 4px 8px 3px rgb(60 64 67 / 15%)",
                    background: "#4A4E51",
                    margin: "10px",
                    objectFit: "fill",
                    width: "100%",
                    height: "100%",
                  }}
                ></video>
              </div>
              {this.state.showModal && (
                <div className="chat-room">
                  <div style={{ flex: "1 1", overflow: "auto" }}>
                    <div>
                      <p>Message In Meet</p>
                    </div>
                    <div>
                      {this.state.messages.length > 0 ? (
                        this.state.messages.map((item, index) => (
                          <div key={index} style={{ textAlign: "left" }}>
                            <p style={{ wordBreak: "break-all" }}>
                              <b>{item.sender}</b>: {item.data}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p>No message yet</p>
                      )}
                    </div>
                  </div>
                  <div className="div-send-msg">
                    <input
                      placeholder=" Enter Message..."
                      value={this.state.message}
                      onChange={(e) => this.handleMessage(e)}
                    />
                    <button
                      variant="contained"
                      color="primary"
                      onClick={this.sendMessage}
                    >
                      <IoSend />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Meeting;

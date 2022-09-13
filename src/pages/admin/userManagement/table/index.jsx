import { useDispatch } from "react-redux";
import { FcHighPriority } from "react-icons/fc";
// import { ImBin } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";
import { OPEN_MODAL } from "../../../../store/constants/modal.const";
import Load from "../../../../components/Load";
import styles from "../../Dashboard/dashboard.module.css";
import GrantUserModal from "../../../../components/Modal/GrantUserModal";
import BlockUserModal from "../../../../components/Modal/BlockUserModal";

function TableAdmin({ loadingInfo, userList, setUsername, setHandleGrant }) {
  const dispatch = useDispatch();
  const onGrantUser = (username, role) => {
    dispatch({
      type: OPEN_MODAL,
      payload: (
        <GrantUserModal
          id={username}
          role={role}
          setHandleGrant={setHandleGrant}
        />
      ),
    });
  };
  const onBlockUser = (username, status) => {
    dispatch({
      type: OPEN_MODAL,
      payload: (
        <BlockUserModal
          id={username}
          status={status}
          setHandleGrant={setHandleGrant}
        />
      ),
    });
  };
  return (
    <table>
      <thead>
        <tr>
          <th style={{ textAlign: "left", borderRadius: "30px 0 0 30px" }}>
            User Name
          </th>
          <th style={{ width: 120 }}>Country</th>
          <th style={{ width: 120 }}>Grant</th>
          <th style={{ width: 120, borderRadius: "0px 30px 30px 0px" }}>
            Block
          </th>
          {/* <th style={{ width: 120, borderRadius: "0px 30px 30px 0px" }}>
            Delete
          </th> */}
        </tr>
      </thead>
      <tbody>
        {loadingInfo ? (
          <tr>
            <td style={{ textAlign: "end" }}>
              <Load />
            </td>
          </tr>
        ) : (
          userList &&
          userList.map((listUser, index) => {
            return (
              <tr key={index}>
                <th onClick={() => setUsername(listUser.username)}>
                  <div className={styles.align_items_center}>
                    <div style={{ marginRight: "20px" }}>
                      <img
                        src={
                          listUser.profileImageUrl === "" ||
                          listUser.profileImageUrl === null
                            ? "https://wrld-se-prod.b-cdn.net/images/user-empty.svg?width=640&height=640"
                            : listUser.profileImageUrl
                        }
                        alt="img"
                      />
                    </div>
                    <p>{listUser.username}</p>
                  </div>
                </th>
                <td>
                  {listUser.country !== null && listUser.country !== ""
                    ? listUser.country
                    : "Việt Nam"}
                </td>
                <td>
                  {listUser.roles?.length === 2 ? (
                    <button
                      onClick={() =>
                        onGrantUser(listUser.username, listUser.roles.length)
                      }
                    >
                      <MdAdminPanelSettings color="#1E82C8" />
                    </button>
                  ) : (
                    <button
                      style={{ opacity: "50%" }}
                      onClick={() =>
                        onGrantUser(listUser.username, listUser.roles.length)
                      }
                    >
                      <MdAdminPanelSettings color="#1E82C8" />
                    </button>
                  )}
                </td>
                <td>
                  {listUser.status === "ACTIVE" ? (
                    <button
                      style={{ opacity: "50%" }}
                      onClick={() =>
                        onBlockUser(listUser.username, listUser.status)
                      }
                    >
                      <FcHighPriority />
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        onBlockUser(listUser.username, listUser.status)
                      }
                    >
                      <FcHighPriority />
                    </button>
                  )}
                </td>
                {/* <td>
                  <button>
                    <ImBin color="#F44336" />
                  </button>
                </td> */}
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}

export default TableAdmin;

import React, { useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from "react";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
// import draftToMarkdown from "draftjs-to-markdown";
import { EditorState, convertToRaw, ContentState } from "draft-js";

const NoteEditor = ({ html, setHtml, viewOnly }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(
    () => {
      const blocksFromHtml = htmlToDraft(html);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    },
    // eslint-disable-next-line
    []
  );

  const onEditorStateChange = (state) => {
    // if (setHtml !== undefined) {
    //   setHtml(draftToHtml(convertToRaw(state.getCurrentContent())));
    // } else {
    //   setMarkdown(draftToMarkdown(convertToRaw(state.getCurrentContent())));
    // }

    setHtml(draftToHtml(convertToRaw(state.getCurrentContent())));
    setEditorState(state);
  };

  return (
    <Editor
      toolbarHidden={viewOnly}
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={onEditorStateChange}
      toolbar={{
        options: [
          "inline",
          "blockType",
          "fontSize",
          "fontFamily",
          "list",
          "textAlign",
          "colorPicker",
          "emoji",
          "remove",
          "history",
        ],
      }}
    />
  );
};
export default NoteEditor;

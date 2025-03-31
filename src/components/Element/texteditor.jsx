import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Gaya default Quill
import "katex/dist/katex.min.css"; // Tambahkan CSS KaTeX
import "highlight.js/styles/github.css"; // Tambahkan CSS untuk code
import katex from "katex";
import { postData } from "../../fetch";

const TextEditor = ({ content, setContent, token }) => {
  const quillRef = useRef(null);

  useEffect(() => {
    window.katex = katex;
  }, []);

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      quill.getModule("toolbar").addHandler("image", imageHandler);
    }
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ script: "sub" }, { script: "super" }], // Superscript/Subscript
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"], // Untuk kode
      ["formula"], // Untuk rumus matematika
      ["image"], // Untuk gambar
      ["clean"],
    ],
  };

  function imageHandler() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  
    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("image", file);
  
      try {
        const res = await postData("upload", formData, token);
        const url = res.imageUrl;
  
        const editor = quillRef.current.getEditor();
      const range = editor.getSelection();
      editor.insertEmbed(range.index, "image", url);
      } catch (error) {
        console.error("Upload gagal", error);
      }
    };
  }
  

  return (
    <div lang="id">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={content}
        onChange={setContent}
        modules={modules}
        placeholder="Tulis materi di sini..."
        className="h-56 font-poppins"
      />
      {/* <div className="mt-24 p-4 border rounded bg-gray-50 ql-snow">
        <h2 className="font-bold">Preview:</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} className="ql-editor" />
      </div>  */}
    </div>
  );
};

export default TextEditor;

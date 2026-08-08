import React from "react";
import Editor from "@monaco-editor/react";
import { registerLatex } from "../../utils/latexLanguage";

export const LatexEditor = ({ value, onChange }) => {
    function handleEditorWillMount(monaco) {
        registerLatex(monaco);
    }
    return (
        <Editor
            beforeMount={handleEditorWillMount}
            height="100%"
            defaultLanguage="latex"
            value={value}
            onChange={onChange}
            theme="vs-light"
            options={{
                minimap: {
                    enabled: true,
                },

                fontSize: 14,

                lineNumbers: "on",

                wordWrap: "on",

                scrollBeyondLastLine: false,

                automaticLayout: true,

                tabSize: 2,

                insertSpaces: true,
            }}
        />
    );
};

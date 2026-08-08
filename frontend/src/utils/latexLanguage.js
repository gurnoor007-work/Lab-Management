export function registerLatex(monaco) {
  monaco.languages.register({
    id: "latex",
  });

  monaco.languages.setMonarchTokensProvider(
    "latex",
    {
      tokenizer: {
        root: [
          [/\\[a-zA-Z]+/, "keyword"],
          [/\{|\}/, "delimiter"],
          [/\$.*?\$/, "string"],
          [/%.*$/, "comment"],
        ],
      },
    }
  );

  monaco.languages.registerCompletionItemProvider(
  "latex",
  {
    provideCompletionItems: () => {
      return {
        suggestions: [
          {
            label: "\\begin",
            kind: monaco.languages
              .CompletionItemKind
              .Keyword,
            insertText:
              "\\begin{$1}\n\t$0\n\\end{$1}",
          },

          {
            label: "\\section",
            kind: monaco.languages
              .CompletionItemKind
              .Keyword,
            insertText:
              "\\section{$1}",
          },

          {
            label: "\\subsection",
            kind: monaco.languages
              .CompletionItemKind
              .Keyword,
            insertText:
              "\\subsection{$1}",
          },
        ],
      };
    },
  }
);
}
import React from 'react'
import { LatexEditor } from './LatexEditor';
import { LatexPreview } from './LatexPreview';

export const MathBlock = () => {
  return (
    <div className="flex bg-amber-200 h-full w-full">
        <div className="latex-editor flex-1">
            <LatexEditor />
        </div>
        <div className="latex-preview flex-1">
            <LatexPreview />
        </div>
    </div>
  )
}

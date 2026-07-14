import React from "react";
import { HeadingButtons } from "./HeadingButtons";
import { HeadingTitle } from "./HeadingTitle";

export const Header = () => {
    return (
        <div className="h-full w-full  flex justify-center items-center">
            <div className="carrier w-[80%]  flex justify-between px-10 py-20">
                <div className="buttons-carrier">
                    <HeadingButtons />
                </div>
                <div className="heading-carrier">
                    <HeadingTitle />
                </div>
            </div>
        </div>
    );
};

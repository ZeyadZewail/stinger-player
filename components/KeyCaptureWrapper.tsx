"use client";

import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export const KeyCaptureWrapper = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  document.onkeydown = function (evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
      isEscape = evt.key === "Escape" || evt.key === "Esc";
    } else {
      //@ts-ignore
      isEscape = evt.keyCode === 27;
    }
    if (isEscape) {
      navigate(-1);
    }
  };

  return children;
};

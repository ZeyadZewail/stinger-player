import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "@/features/home/Home";
import { KeyCaptureWrapper } from "@/components/KeyCaptureWrapper";
import "@/src/App.css";
import { Edit } from "@/features/edit/Edit";
import { PageContainer } from "@/components/PageContainer";
import { Player } from "@/features/player/Player";
import { ManageStingers } from "@/features/manage-stingers/manage-stingers";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <KeyCaptureWrapper>
        <PageContainer>
          <Home />
        </PageContainer>
      </KeyCaptureWrapper>
    ),
  },
  {
    path: "/edit",
    element: (
      <KeyCaptureWrapper>
        <PageContainer>
          <Edit />
        </PageContainer>
      </KeyCaptureWrapper>
    ),
  },
  {
    path: "/player",
    element: (
      <KeyCaptureWrapper>
        <PageContainer>
          <Player />
        </PageContainer>
      </KeyCaptureWrapper>
    ),
  },
  {
    path: "/manage-stingers",
    element: (
      <KeyCaptureWrapper>
        <PageContainer>
          <ManageStingers />
        </PageContainer>
      </KeyCaptureWrapper>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

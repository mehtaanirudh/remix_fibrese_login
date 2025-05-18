import type { MetaFunction } from "@remix-run/node";
import { useEffect } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix +  Firebase popup login" },
    { name: "description", content: "Welcome to Zkootie!" },
  ];
};

export default function Index() {
  useEffect(() => {
    const listener = (e: MessageEvent) => {
      if (e.data?.token) {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = "/auth/callback";

        const input = document.createElement("input");
        input.type = "hidden";
        input.name = "token";
        input.value = e.data.token;

        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();

      }
    };
    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, []);

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Welcome to Zkootie</h1>
          <p className="py-6">
            To get started link your Zkootie account
          </p>
          <button 
            // onClick={() => window.open("/auth/popup", "_blank")}
            onClick={() => window.open("/auth/popup", "_blank", "width=500,height=600")}
            className="btn btn-primary"
          >
            Link Zkootie Account
          </button>
        </div>
      </div>
    </div>
  );
}


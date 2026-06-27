
import type { RouteObject } from "react-router";

export const authRouter: RouteObject[] = [
    {
        path: 'login',
        
        lazy: async () => {
            const { default: Component } = await import("./pages/login")
            return { Component  }
        }
    }
];
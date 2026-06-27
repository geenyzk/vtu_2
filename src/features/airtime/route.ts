import type { RouteObject } from "react-router";

export const airtimeRouter: RouteObject[] = [
    {
        path: 'create',
        
        lazy: async () => {
            const { default: Component } = await import("./pages/create")
            return { Component  }
        }
    }
];
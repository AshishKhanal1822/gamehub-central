"use client";

import Auth from "@/views/Auth";

import { Suspense } from "react";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Auth />
        </Suspense>
    );
}

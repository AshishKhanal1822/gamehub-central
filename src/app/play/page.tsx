"use client";

import { Suspense } from "react";
import PlayOnline from "../../views/PlayOnline";

export default function Page() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <PlayOnline />
        </Suspense>
    );
}

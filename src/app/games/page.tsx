"use client";

import GamesLibrary from "@/views/GamesLibrary";
import { Suspense } from "react";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading games...</div>}>
            <GamesLibrary />
        </Suspense>
    );
}


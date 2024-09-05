/*
 * Vencord, a Discord client mod
 * Copyright (c) 2023 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";

export default definePlugin({
    name: "BetterExperiments",
    authors: [
        {
            id: 766966090579836948n,
            name: "Grafaffel",
        },
    ],
    description: "Better Experiments",
    patches: [
        {
            find: "Bucket Override",
            replacement: {
                match: /Warning: Server did not send any experiment config. You may need to check the "Send to Client" box in the admin UI./,
                replace: "No Rollout Data"
            }
        }
    ],
});

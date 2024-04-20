/*
 * Vencord, a modification for Discord's desktop app
 * Copyright (c) 2023 Vendicated and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { definePluginSettings } from "@api/Settings";
import ErrorBoundary from "@components/ErrorBoundary";
import definePlugin from "@utils/types";
import { findByCodeLazy, findByPropsLazy } from "@webpack";
import { Button, Flex } from "@webpack/common";

const settings = definePluginSettings({});

import { openQuestsModal } from "./components/modals/QuestsModal";
const CustomizationSection = findByCodeLazy(".customizationSectionBackground");

// Credits to https://www.svgrepo.com/svg/507254/crown
const CrownIcon = () => {
    return (
        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 19C5 18.4477 5.44772 18 6 18L18 18C18.5523 18 19 18.4477 19 19C19 19.5523 18.5523 20 18 20L6 20C5.44772 20 5 19.5523 5 19Z" fill="currentColor" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.87867 4.70711C11.0502 3.53554 12.9497 3.53554 14.1213 4.70711L16.6878 7.27359C16.9922 7.57795 17.4571 7.6534 17.8421 7.46091L18.5528 7.10558C20.0877 6.33813 21.7842 7.80954 21.2416 9.43755L19.4045 14.9487C18.9962 16.1737 17.8498 17 16.5585 17H7.44151C6.15022 17 5.0038 16.1737 4.59546 14.9487L2.75842 9.43755C2.21575 7.80955 3.91231 6.33813 5.44721 7.10558L6.15787 7.46091C6.54286 7.6534 7.00783 7.57795 7.31219 7.27359L9.87867 4.70711Z" fill="currentColor" />
        </svg>
    );
};

// let {route: e, selected: t, icon: n, iconClassName: a, interactiveClassName: s, text: r, children: o, locationState: d, onClick: f, className: p, role: m, "aria-posinset": C, "aria-setsize": g, ...E} = this.props;
const { LinkButton } = findByPropsLazy("LinkButton");
const { Routes } = findByPropsLazy("Routes");

export default definePlugin({
    name: "BetterQuests",
    description: "Makes quest more accessible.",
    authors: [
        {
            id: 766966090579836948n,
            name: "Grafaffel",
        },
    ],

    settings,

    patches: [
        {
            find: "DefaultCustomizationSections",
            replacement: {
                match: /(?<=USER_SETTINGS_AVATAR_DECORATION},"decoration"\),)/,
                replace: "$self.QuestsSection(),"
            }
        },
        {
            find: "\"discord-shop\"",
            replacement: {
                match: /"discord-shop"\),/,
                replace: "$&,$self.QuestButton(),"
            }
        }
    ],

    QuestsSection: ErrorBoundary.wrap(function () {
        return <CustomizationSection title={"Quests"}>
            <Flex>
                <Button size={Button.Sizes.SMALL} onClick={() => {
                    openQuestsModal();
                }}>
                    Quests
                </Button>
            </Flex>
        </CustomizationSection>;
    }, { noop: true }),

    QuestButton: ErrorBoundary.wrap(function () {
        return <ErrorBoundary noop>
            <LinkButton
                text="Quests"
                onClick={openQuestsModal}
                icon={CrownIcon}
            />
        </ErrorBoundary>;
    }, { noop: true }),
});

/* eslint-disable simple-header/header */
/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import "../../styles.css";

import { classNameFactory } from "@api/Styles";
import { Flex } from "@components/Flex";
import { ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalProps, ModalRoot, ModalSize, openModal } from "@utils/modal";
import { extractAndLoadChunksLazy, findByProps, findByPropsLazy, findComponentByCode, LazyComponentWebpack } from "@webpack";
import { Button, FluxDispatcher, Text, Tooltip, UserStore, useState } from "@webpack/common";
import React from "react";

import { decorations } from "../../constants";

const DecorationModalStyles = findByPropsLazy("modalFooterShopButton");
const cl = classNameFactory("vc-decor-");
const requireAvatarDecorationModal = extractAndLoadChunksLazy(["openAvatarDecorationModal:"]);

const AvatarDecorationModalPreview = LazyComponentWebpack(() => {
    const component = findComponentByCode(".shopPreviewBanner");
    return React.memo(component);
});

function TestModal(props: ModalProps) {
    const [currDecor, setCurrDecor] = useState(Vencord.Settings.plugins["Fake Avatar Decorations"].avatarDecoration);

    return <ModalRoot
        {...props}
        size={ModalSize.SMALL}
        className={DecorationModalStyles.modal}
    >
        <ModalHeader separator={false} className={cl("modal-header")}>
            <Text
                color="header-primary"
                variant="heading-lg/semibold"
                tag="h1"
                style={{ flexGrow: 1 }}
            >
                Fake Decorations
            </Text>
            <ModalCloseButton onClick={props.onClose} />
        </ModalHeader>
        <ModalContent
            scrollbarType="none"
        >
        </ModalContent>
        <Flex>
            <Flex style={{ overflow: "hidden scroll", maxHeight: "512px", width: "352px", gap: "12px" }} flexDirection="column">
                {decorations.map(decoration => {
                    return <Tooltip text={`${decoration.label}`}>
                        {tooltipProps => (
                            <Button
                                {...tooltipProps}
                                className={cl("selection-button")}
                                style={{ margin: "16px", height: "6rem" }}
                                onClick={() => {
                                    Vencord.Settings.plugins["Fake Avatar Decorations"].avatarDecoration = decoration.value;
                                    setCurrDecor(decoration.value);
                                    findByProps("getCurrentUser").getCurrentUser().avatarDecorationData = { asset: decoration.value };
                                    FluxDispatcher.dispatch({ type: "CURRENT_USER_UPDATE" });
                                }}
                            >
                                <img style={{ width: "6rem", height: "6rem", scale: 0.4 }} src={`https://cdn.discordapp.com/avatar-decoration-presets/${decoration.value}.png?size=16&passthrough=true`} alt={`Decoration Entry (${decoration.label})`} />
                            </Button>
                        )
                        }</Tooltip>;
                })}
            </Flex>
            <AvatarDecorationModalPreview
                user={UserStore.getCurrentUser()}
            />
            {/* <ProfileModalPreview
                forceShowPremium={true}
                profileType="POPOUT"
                hideFakeActivity={true}
                pendingProfileEffectId="1202061433689350204"
                user={UserStore.getCurrentUser()}
            /> */}
        </Flex>
        <ModalFooter>
            <Button
                onClick={() => {
                    props.onClose();
                }}
            >
                Close
            </Button>
        </ModalFooter>
    </ModalRoot >;
}

export const openTestModal = () =>
    requireAvatarDecorationModal().then(() => openModal(props => <TestModal {...props} />));

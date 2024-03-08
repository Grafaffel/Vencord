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
import { Button, FluxDispatcher, Forms, Text, Tooltip, UserStore, useState } from "@webpack/common";
import React from "react";

import { profileEffects } from "../../constants";

const DecorationModalStyles = findByPropsLazy("modalFooterShopButton");
const cl = classNameFactory("vc-decor-");

const requireProfileEffectModal = extractAndLoadChunksLazy(["openAvatarDecorationModal:"]);

const ProfileModalPreview = LazyComponentWebpack(() => {
    const component = findComponentByCode(".profileEffectsModalCustomizationPreviewWithTheme");
    return React.memo(component);
});

function EffectModal(props: ModalProps) {
    const [currEffect, setCurrEffect] = useState(Vencord.Settings.plugins["Fake Profile Effects"].profileEffect);
    const [currEffectInfo, setCurrEffectInfo] = useState("");

    return <ModalRoot
        {...props}
        size={ModalSize.MEDIUM}
        className={DecorationModalStyles.modal}
    >
        <ModalHeader separator={false} className={cl("modal-header")}>
            <Text
                color="header-primary"
                variant="heading-lg/semibold"
                tag="h1"
                style={{ flexGrow: 1 }}
            >
                Fake Profile Effects
            </Text>
            <ModalCloseButton onClick={props.onClose} />
        </ModalHeader>
        <ModalContent
            scrollbarType="none"
        >
        </ModalContent>
        <Flex>
            <Flex style={{ overflow: "hidden scroll", maxHeight: "512px", width: "230px", gap: "12px" }} flexDirection="column">

                {profileEffects.map(effect => {
                    return <Tooltip text={`${effect.title}`}>
                        {tooltipProps => (
                            <Button
                                color={Button.Colors.BLACK}
                                look={Button.Looks.OUTLINED}
                                size={Button.Sizes.XLARGE}
                                {...tooltipProps}
                                className={cl("selection-button")}
                                style={{ margin: "16px", height: "6rem" }}
                                onClick={() => {
                                    Vencord.Settings.plugins["Fake Avatar Decorations"].profileEffectId = effect.id;
                                    setCurrEffect(effect.id);
                                    setCurrEffectInfo(effect.title);
                                    findByProps("getUserProfile").getUserProfile(findByProps("getCurrentUser").getCurrentUser().id).profileEffectId = effect.id;
                                    FluxDispatcher.dispatch({ type: "CURRENT_USER_UPDATE" });
                                }}
                            >
                                <img style={{ width: "6rem", height: "6rem", scale: 0.25 }} src={effect.thumbnailPreviewSrc} alt={`Decoration Entry (${effect.description})`} />
                            </Button>
                        )
                        }</Tooltip>;
                })}
            </Flex>
            <Flex flexDirection="column">
                <ProfileModalPreview
                    forceShowPremium={true}
                    profileType="POPOUT"
                    hideFakeActivity={true}
                    pendingProfileEffectId={currEffect}
                    user={UserStore.getCurrentUser()}
                />
                <Forms.FormTitle>
                    {currEffectInfo}
                </Forms.FormTitle>
            </Flex>
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

export const openEffectModal = () =>
    requireProfileEffectModal().then(() => openModal(props => <EffectModal {...props} />));

// Type definitions for Minecraft Bedrock Edition script APIs (experimental) 0.1
// Project: https://docs.microsoft.com/minecraft/creator/
// Definitions by: Jake Shirley <https://github.com/JakeShirley>
//                 Mike Ammerlaan <https://github.com/mammerla>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/* *****************************************************************************
   Copyright (c) Microsoft Corporation.
   ***************************************************************************** */
declare module "mojang-minecraft-ui" {
    import * as mojangminecraft from "mojang-minecraft";
    export class ActionFormData {
        body(bodyText: string): ActionFormData;
        button(text: string, iconPath?: string): ActionFormData;
        constructor();
        show(player: mojangminecraft.Player): Promise<ActionFormResponse>;
        title(titleText: string): ActionFormData;
    }
    export class ActionFormResponse extends FormResponse {
        readonly "isCanceled": boolean;
        readonly "selection": number;
    }
    export class FormResponse {
        readonly "isCanceled": boolean;
    }
    export class MessageFormData {
        body(bodyText: string): MessageFormData;
        button1(text: string): MessageFormData;
        button2(text: string): MessageFormData;
        constructor();
        show(player: mojangminecraft.Player): Promise<MessageFormResponse>;
        title(titleText: string): MessageFormData;
    }
    export class MessageFormResponse extends FormResponse {
        readonly "isCanceled": boolean;
        readonly "selection": number;
    }
    export class ModalFormData {
        constructor();
        dropdown(label: string, options: string[], defaultValueIndex?: number): ModalFormData;
        icon(iconPath: string): ModalFormData;
        show(player: mojangminecraft.Player): Promise<ModalFormResponse>;
        slider(label: string, minimumValue: number, maximumValue: number, valueStep: number, defaultValue?: number): ModalFormData;
        textField(label: string, placeholderText: string, defaultValue?: string): ModalFormData;
        title(titleText: string): ModalFormData;
        toggle(label: string, defaultValue?: boolean): ModalFormData;
    }
    export class ModalFormResponse extends FormResponse {
        readonly "formValues": any[];
        readonly "isCanceled": boolean;
    }

}
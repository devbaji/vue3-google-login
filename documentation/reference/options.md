---
title: Options
order: 8
---

# Options

## Plugin Options and GoogleLogin Component Props

Options used when [initializing the plugin](../guide/getting-started#initialize-the-plugin) and prop values in the [GoogleLogin component](../guide/getting-started#using-the-googlelogin-component) are similar.

| Name            |   Type   | Description                                                                                                                                                                                                                                                                                                                                         |
| --------------- | :------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| clientId        |  String  | Google API client ID                                                                                                                                                                                                                                                                                                                                |
| prompt          | Boolean  | Set this to true to display the One Tap prompt<br/><br/>Setting this value as a prop of the GoogleLogin component will be ignored if this is set as option on plugin initialization                                                                                                               |
| autoLogin       | Boolean  | Setting this value to true will make the prompt to automatically log in without any user interactions<br/><br/>For this to work `prompt` must be set to true<br/><br/>Setting this value as a prop of the GoogleLogin component will be ignored if this is set as option on plugin initialization |
| popupType       |  String  | Type of callback response, accepts either `CODE` or `TOKEN`, this only works if a [custom button is added as a slot](../guide/custom-button#custom-button-as-slot)                                                                                                                                                                                         |
| callback        | Function | The callback function which will be triggered with a response object once the login is completed                                                                                                                                                                                                                                                    |
| error           | Function | An error function which will be triggered on any error encountered while showing the prompts/popups                                                                                                                                                                                                                                                 |
| idConfiguration |  Object  | IdConfiguration object for initializing, see list of fields and descriptions of the IdConfiguration [here](https://developers.google.com/identity/gsi/web/reference/js-reference#IdConfiguration)                                                                                                                                                   |
| buttonConfig    |  Object  | Configuration of the login button rendered by Google, see list of fields and descriptions [here](https://developers.google.com/identity/gsi/web/reference/js-reference#GsiButtonConfiguration)                                                                                                                                                      |

## Function googleOneTap

`googleOneTap` function accepts the following options:

| Name               |   Type   | Description                                                                                                                                                                                                                                                                                                  |
| ------------------ | :------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| clientId           |  String  | Google API client ID                                                                                                                                                                                                                                                                                         |
| context            |  String  | The title and words in the One Tap prompt, this can be `signin`&#124;`signup`&#124;`use` see [here](https://developers.google.com/identity/gsi/web/guides/change-sign-in-context) for more info                                                                                                              |
| autoLogin          | Boolean  | Set this to true if you want the one-tap prompt to automatically login                                                                                                                                                                                                                                       |
| cancelOnTapOutside | Boolean  | Controls whether to cancel the prompt if the user clicks outside of the prompt                                                                                                                                                                                                                               |

## Function googleAuthCodeLogin and googleTokenLogin

`googleAuthCodeLogin` and `googleTokenLogin` functions accept an object with a client id. This is useful if you are not planning to initialize the plugin in `main.js`:

| Name     |  Type  | Description          |
| -------- | :----: | :------------------- |
| clientId | String | Google API client ID |

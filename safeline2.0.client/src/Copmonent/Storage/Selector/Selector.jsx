import { createSelector } from "@reduxjs/toolkit";
import { StatusEnum } from "../../Utils/Enum";


export const selectLoader = createSelector(
    state => state.SignalR,
    state => state.SafelineState,
    (SignalR, SafelineState) =>
        !SignalR.hub ||
        SafelineState.loader === true ||
        SafelineState.Status === StatusEnum.Loading ||
        SafelineState.Status === StatusEnum.Ideal
);

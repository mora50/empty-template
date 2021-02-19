import React, { FC, useMemo, createContext, useReducer } from "react";
import { SSRProvider, OverlayProvider } from "react-aria";

export interface State {
  displayLocationBar: boolean;
  displaySideBar: boolean;
  displayAccessDropdown: boolean;
}

const initialState = {
  displayLocationBar: false,
  displaySideBar: false,
  displayAccessDropdown: false,
  displayCartBar: false,
  displayDropDownUser: "LOGIN_VIEW",
};

type MODAL_VIEWS = "LOGIN_VIEW" | "LOGGED_VIEW";

type Action =
  | {
      type: "OPEN_LOCATION_BAR";
    }
  | {
      type: "CLOSE_LOCATION_BAR";
    }
  | {
      type: "OPEN_SIDE_BAR";
    }
  | { type: "CLOSE_SIDE_BAR" }
  | {
      type: "OPEN_CART_BAR";
    }
  | { type: "CLOSE_CART_BAR" }
  | {
      type: "OPEN_ACESS_DROPDOWN";
    }
  | { type: "CLOSE_ACESS_DROPDOWN" }
  | {
      type: "SET_DROPDOWN_AUTH_VIEW";
      view: MODAL_VIEWS;
    };

export const UIContext = createContext<State | any>(initialState);

UIContext.displayName = "UIContext";

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case "OPEN_LOCATION_BAR":
      return {
        ...state,
        displayLocationBar: true,
      };
    case "CLOSE_LOCATION_BAR":
      return {
        ...state,
        displayLocationBar: false,
      };

    case "OPEN_SIDE_BAR":
      return {
        ...state,
        displaySideBar: true,
      };
    case "CLOSE_SIDE_BAR":
      return {
        ...state,
        displaySideBar: false,
      };

    case "OPEN_CART_BAR":
      return {
        ...state,
        displayCartBar: true,
      };
    case "CLOSE_CART_BAR":
      return {
        ...state,
        displayCartBar: false,
      };

    case "OPEN_ACESS_DROPDOWN":
      return {
        ...state,
        displayAccessDropdown: true,
      };
    case "CLOSE_ACESS_DROPDOWN":
      return {
        ...state,
        displayAccessDropdown: false,
      };

    case "SET_DROPDOWN_AUTH_VIEW":
      return {
        ...state,
        displayDropDownUser: action.view,
      };
  }
}

export const UIProvider: FC = (props) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const openLocationBar = () => dispatch({ type: "OPEN_LOCATION_BAR" });

  const closeLocationBar = () => dispatch({ type: "CLOSE_LOCATION_BAR" });

  const openCartBar = () => dispatch({ type: "OPEN_CART_BAR" });

  const closeCartBar = () => dispatch({ type: "CLOSE_CART_BAR" });

  const openAccessDropdown = () => dispatch({ type: "OPEN_ACESS_DROPDOWN" });

  const closeAccessDropdown = () => dispatch({ type: "CLOSE_ACESS_DROPDOWN" });

  const openSideBar = () => dispatch({ type: "OPEN_SIDE_BAR" });

  const closeSideBar = () => dispatch({ type: "CLOSE_SIDE_BAR" });

  const setModalView = (view: MODAL_VIEWS) =>
    dispatch({ type: "SET_DROPDOWN_AUTH_VIEW", view });

  const value = useMemo(
    () => ({
      ...state,

      openLocationBar,
      openSideBar,
      closeSideBar,
      closeLocationBar,
      openAccessDropdown,
      closeAccessDropdown,
      openCartBar,
      closeCartBar,
    }),
    [state]
  );

  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context = React.useContext(UIContext);

  if (context === undefined) {
    throw new Error("useUI must be used within a UIProvider");
  }

  return context;
};

export const ManagedUIContext: FC = ({ children }) => (
  <UIProvider>
    <SSRProvider>
      <OverlayProvider className="h-full">{children}</OverlayProvider>
    </SSRProvider>
  </UIProvider>
);

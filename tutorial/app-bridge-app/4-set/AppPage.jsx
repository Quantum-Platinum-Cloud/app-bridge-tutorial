/*

  App Page

*/
import React, { useState, useEffect } from "react";
import createApp from "@shopify/app-bridge";
import { TitleBar, Button } from "@shopify/app-bridge/actions";

import Cookies from "js-cookie";
const shopOrigin = Cookies.get("shopOrigin");

import NewTodoForm from "./NewTodoForm";
import TodoList from "./TodoList";

const app = createApp({
  apiKey: SHOPIFY_API_KEY,
  shopOrigin: shopOrigin,
  forceRedirect: true
});

export default function AppPage() {
  const [isNewTodoFormActive, setNewTodoForm] = useState(false);
  const [todoItems, setTodoItems] = useState([]);

  useEffect(function() {
    const newTodoButton = Button.create(app, { label: "New Todo" });

    newTodoButton.subscribe(Button.Action.CLICK, function() {
      setNewTodoForm(true);
    });

    const titleBar = TitleBar.create(app, {
      title: "Home",
      buttons: { primary: newTodoButton }
    });
  });

  function submitNewTodoForm(newTodoItem) {
    const newTodoList = [newTodoItem, ...todoItems];
    setTodoItems(newTodoList);
    setNewTodoForm(false);
  }

  if (isNewTodoFormActive) {
    newTodoButton.set({ disabled: true });
    return <NewTodoForm onSubmit={submitNewTodoForm} />;
  } else {
    return <TodoList todoListItems={todoItems} />;
  }
}

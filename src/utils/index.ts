import { MenuItemModel } from '../models';

const getUniqueID = (): string => {
  const id = Date.now().toString(36) + Math.random().toString(36).substring(2);
  return id;
};

export const getMenuItemFromInput = (
  title: string,
  description: string,
  price: string,
  image: string
): MenuItemModel => {
  const newItem: MenuItemModel = {
    id: getUniqueID(),
    title,
    description,
    price,
    image,
  };
  return newItem;
};

export const removeMenuItem = (itemToRemove: MenuItemModel, currentItems: MenuItemModel[]): MenuItemModel[] => {
  const newItems = currentItems.filter(item => item.id !== itemToRemove.id);
  return newItems;
};

export const replaceMenuItem = (oldItem: MenuItemModel, newItem: MenuItemModel, currentItems: MenuItemModel[]): MenuItemModel[] => {
  const index = currentItems.findIndex(item => item.id === oldItem.id);
  currentItems[index] = newItem;
  return currentItems;
};

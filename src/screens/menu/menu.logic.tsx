import * as React from 'react';
import { Alert, AlertButton } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MenuProps } from '.';
import { MenuItemModel, MenuItem_Test } from '../../models';
import { NavigationPropList, NavigationScreens } from '../../models/navigation';
import MenuLayout from './menu.layout';
import { useItems, useAddItems, useRemoveItem, useReplaceItem } from '../../hooks';

const UI_TESTING = true;

type MenuNavigationProps = StackNavigationProp<NavigationPropList, NavigationScreens.Menu>;
interface MenuScreenProps {
  route: { params: MenuProps };
  navigation: MenuNavigationProps;
}

const Menu = (_props: MenuScreenProps) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const menuItems = useItems();
  const addItems = useAddItems();
  const removeItem = useRemoveItem();
  const replaceItem = useReplaceItem();

  const fetchMenuItemData = React.useCallback(() => {
    setRefreshing(true);

    if (UI_TESTING) {
      setTimeout(() => {
        setRefreshing(false);
        if (!menuItems.length) {
          addItems(MenuItem_Test);
        }
      }, 2000);
    } else {
      // TODO: fetch data from server
    }
  }, [addItems, menuItems, setRefreshing]);

  React.useEffect(() => {
    if (!menuItems.length) {
      fetchMenuItemData();
    }
  }, [fetchMenuItemData, menuItems]);

  const onDeleteItem = (item: MenuItemModel, callback?: (shouldDelete: boolean) => void) => {
    const onDelete = () => {
      if (callback) {
        callback(true);
      }
      removeItem(item);
    };

    const onCancel = () => {
      if (callback) {
        callback(false);
      }
    };

    const deleteButton: AlertButton = { text: 'Delete', onPress: onDelete, style: 'destructive' };
    const cancelButton: AlertButton = { text: 'Cancel', onPress: onCancel, style: 'cancel' };
    Alert.alert('Are you sure?', `Delete ${item.title} from the menu?`, [deleteButton, cancelButton]);
  };

  const onUpdateItem = React.useCallback((currentItem: MenuItemModel, newItem: MenuItemModel) => {
    replaceItem(currentItem, newItem);
  }, [replaceItem]);

  const onRefresh = () => {
    fetchMenuItemData();
  };

  return <MenuLayout
    menuItems={menuItems}
    refreshing={refreshing}
    onDeleteItem={onDeleteItem}
    onUpdateItem={onUpdateItem}
    onRefresh={onRefresh}
  />;
};

export default Menu;

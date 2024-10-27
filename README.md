# Inventory Management System

This project is an inventory management application built using React Native. It allows users to list, add, edit, and delete inventory items, utilizing AsyncStorage for data persistence.

## Features

- List view of all inventory items
- Add new items to the inventory
- Edit existing items in the inventory
- Delete items from the inventory
- Form validation for item creation and editing
- Confirmation popup for deleting items

## Requirements

- React Native (TypeScript)
- React Navigation 5 for navigation
- AsyncStorage for data storage

## Screens

### 1. Inventory Listing

The main screen displaying a list of all inventory items, including:
- Item name
- Price
- Total stock
- An "Add More Items" button

### 2. Create Inventory

A form allowing users to create new items with the following fields:
- Name (required, unique)
- Total Stock (required, numeric)
- Price (required, numeric)
- Description (required, minimum 3 words)

### 3. Edit Inventory

A form for editing existing items, similar to the Create Inventory screen, but with the ability to delete the current item.

### 4. Delete Inventory

A button on the Edit Inventory screen to confirm deletion of the current item.

## Testing

Unit tests and snapshot tests have been implemented to ensure:
- Proper rendering of each screen
- Correct behavior of the confirmation popup for deletions
- Navigation between screens
- CRUD operations on AsyncStorage

## Setup Instructions

1. Clone the repository
2. Install dependencies using `npm install`
3. Run the app using `npx react-native run-android` or `npx react-native run-ios`

Note: Ensure you have the necessary environment set up for Android/iOS development.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or issues through the GitHub repository.

## License


This README provides an overview of the Inventory Management System project, detailing its features, requirements, and testing aspects. It serves as a guide for users who want to understand and potentially contribute to the project.


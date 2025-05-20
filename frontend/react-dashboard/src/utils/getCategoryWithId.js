import categoryApi from "../data/categoryApi";

const getCategoryIdWithIcon = async (iconId, token) => {
  try {
    
    const categories = await categoryApi.getCategoriesByUserId(token);
    console.log("Fetched categories:", categories);
   
    const category = categories.find(item => item.iconName === iconId);

    if (!category) {
      throw new Error(`Category with icon "${iconId}" not found.`);
    }

    
    return category.categoryId;
  } catch (error) {
    console.error('Error in getCategoryIdWithIcon:', error);
    throw error;
  }
};

export default getCategoryIdWithIcon;
// Environment-based path configuration
export const config = {
  // For development, use /Data/ paths
  // For production, use /resources/data/ paths
  isDevelopment: import.meta.env.DEV,
  
  get dataPath() {
    return this.isDevelopment ? '/Data/' : '/resources/data/';
  },
  
  get assetsPath() {
    return this.isDevelopment ? '/Assets/' : '/resources/assets/';
  }
};

// Helper function to get the correct data path
export const getDataPath = (filename: string): string => {
  return `${config.dataPath}${filename}`;
};

// Helper function to get the correct assets path
export const getAssetsPath = (filename: string): string => {
  return `${config.assetsPath}${filename}`;
};

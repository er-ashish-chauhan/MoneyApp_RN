export default {
    Login: `/api/login`,
    Register: `/api/register`,
    UserDetails: `/api/user-details/`,
    GetCategoryById: (id: number) => `/api/get-category/${id}`,
    privacy: `/api/privacy-policy`,
    terms: `/api/terms-and-conditions`,
    addCategory: `/api/add-category`,
    getCategories: (page: number, size: number) => `/api/categories?per_page=${size}&page=${page}`,
    addCategoryNote: (id: number) => `/api/payment-note/${id}`,
    updateCategory: (id: number) => `/api/upd-category/${id}`,
    uploadMedia: `/api/upload-image`,
    changePassword: `/api/update-password`,
    forgotPassword: `/api/forgot-password`,
    deleteAccount: `/api/delete-user`,
    deleteCategory: (id: number) => `/api/category/${id}`,
    deleteTransaction: (id: number) => `/api/delete-note/${id}`,
    updateTransaction: (id: number) => `api/upd-note/${id}`
}
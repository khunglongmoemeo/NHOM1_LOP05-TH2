const KEYS = {
  KHOI_KIEN_THUC: 'db_khoi_kien_thuc',
  MON_HOC: 'db_mon_hoc',
};

export const StorageService = {
  // Lấy dữ liệu
  getData: (key: string) => JSON.parse(localStorage.getItem(key) || '[]'),

  // Thêm mới
  saveData: (key: string, data: any) => {
    const current = StorageService.getData(key);
    localStorage.setItem(key, JSON.stringify([...current, data]));
  },

  // Xóa
  deleteData: (key: string, idField: string, idValue: any) => {
    const current = StorageService.getData(key);
    const filtered = current.filter((item: any) => item[idField] !== idValue);
    localStorage.setItem(key, JSON.stringify(filtered));
  }
};

export { KEYS };
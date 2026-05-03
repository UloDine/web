interface BaseResponse<T> {
  status: string;
  message: string;
  data: T | null;
  errorCode?: string;
}

interface ApiResponse<T = any> {
  status: number;
  data: T;
  message?: string;
}

interface Toast {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
  duration?: number; // in milliseconds
}

interface ModalOptions {
  title: string;
  content: string | JSX.Element;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role?: "admin" | "user" | "moderator";
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoggedUser {
  id: string;
  fullName: string;
  email: string;
  role: "user" | "restaurant" | "admin";
}

interface LoginResponse extends BaseResponse<LoggedUser> {}

interface RegisterRequest {
  business: BusinessDetails;
  personal: PersonalDetails;
  auth: AuthDetails;
}

interface RegisterResponsePayload {
  user: {
    id: string;
    user_role: string;
    email: string;
  };
  restaurant: {
    id: string;
    business_name: string;
    business_plan: string;
  };
}
interface RegisterResponse extends BaseResponse<RegisterResponsePayload> {}

interface PaginationRequest {
  page: number;
  pageSize: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

interface PaginatedResponse<T = any> {
  total: number;
  page: number;
  pageSize: number;
  items: T[];
}

interface FileUploadResponse {
  fileId: string;
  fileName: string;
  url: string;
  uploadedAt: string;
}

interface FileUploadRequest {
  file: File;
  uploadPath?: string; // Optional path to upload the file
}

interface FormField {
  name: string;
  label: string;
  type: "text" | "number" | "email" | "password" | "select";
  required?: boolean;
  options?: string[];
  validation?: (value: any) => string | null;
}

interface ApiError {
  status: number;
  message: string;
  details?: string[];
  timestamp?: string;
}

interface UIState {
  isLoading: boolean;
  isModalOpen: boolean;
  toastQueue: Toast[];
}

interface ApiService {
  get<T>(url: string): Promise<BaseResponse<T>>;
  post<T>(url: string, data?: any): Promise<BaseResponse<T>>;
  put<T>(url: string, data?: any): Promise<BaseResponse<T>>;
  del<T>(url: string): Promise<BaseResponse<T>>;
}

type Nullable<T> = T | null;
type Optional<T> = T | undefined;
type ApiResult<T = any> = Promise<BaseResponse<T>>;

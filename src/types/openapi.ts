/* eslint-disable */
// Auto-generated from wp-admin.openapi.json

/** 统一响应结果 */
export interface ResultVoid {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  /** 响应数据 */
  data?: Record<string, unknown>;
  /** 时间戳 */
  timestamp?: number;
  success?: boolean;
}

/** 响应数据 */
export interface AppVersion {
  id?: number;
  createTime?: string;
  updateTime?: string;
  deleted?: number;
  appType?: string;
  versionCode?: string;
  versionNumber?: number;
  title?: string;
  announcement?: string;
  content?: string;
  guideUrl?: string;
  downloadUrl?: string;
  packageSize?: number;
  packageMd5?: string;
  forceUpdate?: number;
  minSupportVersion?: string;
  status?: number;
  publishTime?: string;
  publisherId?: number;
  remark?: string;
}

/** 统一响应结果 */
export interface ResultAppVersion {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  data?: AppVersion;
  /** 时间戳 */
  timestamp?: number;
  success?: boolean;
}

/** 更新管理员用户请求 */
export interface AdminUserUpdateRequest {
  /** 管理员用户ID */
  id: number;
  /** 昵称 */
  nickname?: string;
  /** 状态：0-启用，1-禁用 */
  status?: number;
  /** 备注 */
  remark?: string;
}

/** 管理员用户信息 */
export interface AdminUserInfoResponse {
  /** 用户ID */
  id?: number;
  /** 用户名 */
  username?: string;
  /** 昵称 */
  nickname?: string;
  /** 角色：SUPER_ADMIN-超级管理员，ADMIN-普通管理员 */
  role?: string;
  /** 状态：0-启用，1-禁用 */
  status?: number;
  /** 备注 */
  remark?: string;
  /** 最近登录时间 */
  lastLoginTime?: string;
  /** 最近登录IP */
  lastLoginIp?: string;
  /** 创建时间 */
  createTime?: string;
}

/** 统一响应结果 */
export interface ResultAdminUserInfoResponse {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  data?: AdminUserInfoResponse;
  /** 时间戳 */
  timestamp?: number;
  success?: boolean;
}

/** 修改管理员密码请求 */
export interface AdminChangePasswordRequest {
  /** 目标管理员用户ID */
  adminUserId: number;
  /** 新密码（明文，将在服务端 BCrypt 加密） */
  newPassword: string;
}

/** 翻译线路配置保存请求 */
export interface AdminTranslateRouteSaveRequest {
  /** 线路ID（修改时必填） */
  id?: number;
  /** 线路编码（唯一标识） */
  routeCode: string;
  /** 线路名称 */
  routeName: string;
  /** 线路类型：ai-AI智能翻译，basic-基础翻译引擎 */
  routeType: string;
  /** 提供商：openai/aliyun/google/tencent/microsoft等 */
  provider: string;
  /** AI模型代码（AI智能翻译时使用，如qwen-mt-flash） */
  modelCode?: string;
  /** API地址 */
  apiUrl?: string;
  /** API密钥配置Key（指向系统配置） */
  apiKeyConfig?: string;
  /** 图标URL */
  icon?: string;
  /** 线路描述 */
  description?: string;
  /** 支持的语言列表（JSON数组） */
  supportedLangs?: string;
  /** 每字符消耗tokens数（基础翻译引擎用） */
  tokensPerChar?: number;
  /** 是否AI翻译：0-否，1-是 */
  isAi?: number;
  /** 是否默认线路：0-否，1-是 */
  isDefault?: number;
  /** 是否启用：0-禁用，1-启用 */
  isEnabled?: number;
  /** 排序序号 */
  sortOrder?: number;
}

/** 统一响应结果 */
export interface ResultTranslateRoute {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  data?: TranslateRoute;
  /** 时间戳 */
  timestamp?: number;
  success?: boolean;
}

/** 响应数据 */
export interface TranslateRoute {
  id?: number;
  createTime?: string;
  updateTime?: string;
  deleted?: number;
  routeCode?: string;
  routeName?: string;
  routeType?: string;
  provider?: string;
  modelId?: string;
  modelCode?: string;
  apiUrl?: string;
  apiKeyConfig?: string;
  icon?: string;
  description?: string;
  supportedLangs?: string;
  tokensPerChar?: number;
  isAi?: number;
  isDefault?: number;
  isEnabled?: number;
  sortOrder?: number;
  basicRoute?: boolean;
  effectiveModelCode?: string;
  aiRoute?: boolean;
}

/** Token价格套餐新增/修改请求 */
export interface TokenPricePackageSaveRequest {
  /** 套餐ID（修改时传入） */
  id?: number;
  /** Token数量 */
  tokensAmount: number;
  /** 套餐名称 */
  packageName?: string;
  /** 套餐描述 */
  description?: string;
  /** USD原价 */
  usdOriginalPrice?: number;
  /** USD折扣率 */
  usdDiscountRate?: number;
  /** USD实际价格 */
  usdActualPrice?: number;
  /** CNY原价 */
  cnyOriginalPrice?: number;
  /** CNY折扣率 */
  cnyDiscountRate?: number;
  /** CNY实际价格 */
  cnyActualPrice?: number;
  /** EUR原价 */
  eurOriginalPrice?: number;
  /** EUR折扣率 */
  eurDiscountRate?: number;
  /** EUR实际价格 */
  eurActualPrice?: number;
  /** 手续费配置JSON */
  processingFeeConfig?: string;
  /** 是否启用：0-禁用，1-启用 */
  enabled?: number;
  /** 排序序号 */
  sortOrder?: number;
  /** 促销标签 */
  promotionTag?: string;
  /** 促销开始时间 */
  promotionStartTime?: string;
  /** 促销结束时间 */
  promotionEndTime?: string;
  /** 是否推荐：0-否，1-是 */
  isRecommended?: number;
}

/** 统一响应结果 */
export interface ResultTokenPricePackage {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  data?: TokenPricePackage;
  /** 时间戳 */
  timestamp?: number;
  success?: boolean;
}

/** 响应数据 */
export interface TokenPricePackage {
  id?: number;
  createTime?: string;
  updateTime?: string;
  deleted?: number;
  tokensAmount?: number;
  packageName?: string;
  description?: string;
  usdOriginalPrice?: number;
  usdDiscountRate?: number;
  usdActualPrice?: number;
  cnyOriginalPrice?: number;
  cnyDiscountRate?: number;
  cnyActualPrice?: number;
  eurOriginalPrice?: number;
  eurDiscountRate?: number;
  eurActualPrice?: number;
  processingFeeConfig?: string;
  enabled?: number;
  sortOrder?: number;
  promotionTag?: string;
  promotionStartTime?: string;
  promotionEndTime?: string;
  isRecommended?: number;
  isOfficialPrice?: number;
  inPromotion?: boolean;
}

/** Token异常监测配置保存请求 */
export interface AdminTokenAlertConfigSaveRequest {
  /** 配置ID（修改时必填） */
  id?: number;
  /** 团队ID（0表示全局配置） */
  teamId: number;
  /** 用户ID（null表示团队级别监测） */
  userId?: number;
  /** 监测规则名称 */
  alertName: string;
  /** 时间窗口类型：hour-小时，day-天 */
  timeWindowType: string;
  /** 时间窗口值（如1、24、7等） */
  timeWindowValue: number;
  /** Token阈值 */
  threshold: number;
  /** 告警邮箱（null则使用平台邮箱） */
  alertEmail?: string;
  /** 是否启用：0-禁用，1-启用 */
  isEnabled?: number;
  /** 告警间隔（分钟），防止频繁发送 */
  alertIntervalMinutes?: number;
}

/** 统一响应结果 */
export interface ResultTokenAlertConfig {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  data?: TokenAlertConfig;
  /** 时间戳 */
  timestamp?: number;
  success?: boolean;
}

/** 响应数据 */
export interface TokenAlertConfig {
  id?: number;
  createTime?: string;
  updateTime?: string;
  deleted?: number;
  teamId?: number;
  userId?: number;
  alertName?: string;
  timeWindowType?: string;
  timeWindowValue?: number;
  threshold?: number;
  alertEmail?: string;
  isEnabled?: number;
  lastAlertTime?: string;
  alertIntervalMinutes?: number;
}

/** 系统配置新增/修改请求 */
export interface SystemConfigSaveRequest {
  /** 配置ID（修改时传入） */
  id?: number;
  /** 配置键 */
  configKey: string;
  /** 配置值 */
  configValue: string;
  /** 配置名称 */
  configName?: string;
  /** 配置描述 */
  configDesc?: string;
  /** 配置值类型：STRING, INTEGER, LONG, DOUBLE, BOOLEAN, JSON */
  configType?: string;
  /** 配置分组 */
  configGroup?: string;
  /** 排序序号 */
  sortOrder?: number;
}

/** 统一响应结果 */
export interface ResultSystemConfig {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  data?: SystemConfig;
  /** 时间戳 */
  timestamp?: number;
  success?: boolean;
}

/** 响应数据 */
export interface SystemConfig {
  id?: number;
  configKey?: string;
  configValue?: string;
  configName?: string;
  configDesc?: string;
  configType?: string;
  configGroup?: string;
  sortOrder?: number;
  isSystem?: boolean;
  isEncrypted?: boolean;
  createTime?: string;
  updateTime?: string;
  deleted?: number;
}

/** 会员套餐新增/修改请求 */
export interface MembershipPlanSaveRequest {
  /** 套餐ID（修改时传入） */
  id?: number;
  /** 会员等级：0-免费版，1-基础版，2-专业版，3-企业版，4-旗舰版 */
  level: number;
  /** 是否免费套餐：0-否，1-是 */
  isFree?: number;
  /** 套餐名称 */
  name: string;
  /** 套餐描述 */
  description?: string;
  /** 月费价格 */
  monthlyPrice?: number;
  /** 年费价格 */
  yearlyPrice?: number;
  /** 月费折扣(0.01-1.00) */
  monthlyDiscount?: number;
  /** 月费折扣开始时间 */
  monthlyDiscountStart?: string;
  /** 月费折扣结束时间 */
  monthlyDiscountEnd?: string;
  /** 年费折扣(0.01-1.00) */
  yearlyDiscount?: number;
  /** 年费折扣开始时间 */
  yearlyDiscountStart?: string;
  /** 年费折扣结束时间 */
  yearlyDiscountEnd?: string;
  /** 包含的Tokens数量 */
  tokens?: number;
  /** 最大团队人数 */
  maxTeamMembers?: number;
  /** 功能列表（JSON格式） */
  features?: string;
  /** 是否启用：0-禁用，1-启用 */
  enabled?: number;
  /** 排序 */
  sort?: number;
}

/** 响应数据 */
export interface MembershipPlan {
  id?: number;
  createTime?: string;
  updateTime?: string;
  deleted?: number;
  level?: number;
  isFree?: number;
  name?: string;
  description?: string;
  monthlyPrice?: number;
  yearlyPrice?: number;
  monthlyDiscount?: number;
  monthlyDiscountStart?: string;
  monthlyDiscountEnd?: string;
  yearlyDiscount?: number;
  yearlyDiscountStart?: string;
  yearlyDiscountEnd?: string;
  tokens?: number;
  maxTeamMembers?: number;
  features?: string;
  enabled?: number;
  sort?: number;
  effectiveYearlyDiscount?: number;
  actualMonthlyPrice?: number;
  actualYearlyPrice?: number;
  effectiveMonthlyDiscount?: number;
  freeplan?: boolean;
}

/** 统一响应结果 */
export interface ResultMembershipPlan {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  data?: MembershipPlan;
  /** 时间戳 */
  timestamp?: number;
  success?: boolean;
}

/** 批量重新向量化请求 */
export interface AdminDatasourceReVectorizeRequest {
  /** 数据源条目列表 */
  items: Array<DatasourceItem>;
  /** 目标知识库提供商类型：local/dify/aliyun/volcano/xai */
  targetKbProviderType: string;
}

/** 数据源条目 */
export interface DatasourceItem {
  /** 用户ID */
  userId: number;
  /** 数据源ID */
  datasourceId: number;
}

/** 统一响应结果 */
export interface ResultMapStringObject {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  /** 响应数据 */
  data?: Record<string, Record<string, unknown>>;
  /** 时间戳 */
  timestamp?: number;
  success?: boolean;
}

/** AI聊天机器人线路配置保存请求 */
export interface AdminAiChatbotRouteSaveRequest {
  /** 线路ID（修改时必填） */
  id?: number;
  /** 线路编码（唯一标识） */
  routeCode: string;
  /** 线路名称 */
  routeName: string;
  /** 提供商：openai/aliyun/deepseek/kimi等 */
  provider: string;
  /** AI模型代码（如qwen3-max, gpt-4等） */
  modelCode: string;
  /** API地址（可选，不填使用默认） */
  apiUrl?: string;
  /** API密钥（可选，不填使用环境变量配置） */
  apiKey?: string;
  /** 图标URL */
  icon?: string;
  /** 线路描述 */
  description?: string;
  /** 最大Token数 */
  maxTokens?: number;
  /** 温度参数 */
  temperature?: number;
  /** Token消耗倍率 */
  tokensRate?: number;
  /** 是否默认线路：0-否，1-是 */
  isDefault?: number;
  /** 是否启用：0-禁用，1-启用 */
  isEnabled?: number;
  /** 排序序号 */
  sortOrder?: number;
  /** 重排序模式（本地RAG用）：cohere/jina/bge/none */
  rerankerMode?: string;
}

/** 响应数据 */
export interface AiChatbotRoute {
  id?: number;
  createTime?: string;
  updateTime?: string;
  deleted?: number;
  routeCode?: string;
  routeName?: string;
  provider?: string;
  modelCode?: string;
  apiUrl?: string;
  apiKey?: string;
  icon?: string;
  description?: string;
  maxTokens?: number;
  temperature?: number;
  tokensRate?: number;
  isDefault?: number;
  isEnabled?: number;
  sortOrder?: number;
  rerankerMode?: string;
  enabled?: boolean;
  defaultRoute?: boolean;
  effectiveTokensRate?: number;
  effectiveApiKey?: string;
}

/** 统一响应结果 */
export interface ResultAiChatbotRoute {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  data?: AiChatbotRoute;
  /** 时间戳 */
  timestamp?: number;
  success?: boolean;
}

/** 管理员登录请求 */
export interface AdminLoginRequest {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
}

/** 管理员登录响应 */
export interface AdminLoginResponse {
  /** 访问Token */
  token?: string;
  /** 用户名 */
  username?: string;
  /** Token过期时间（秒） */
  expireIn?: number;
  /** 角色：SUPER_ADMIN-超级管理员，ADMIN-普通管理员 */
  role?: string;
}

/** 统一响应结果 */
export interface ResultAdminLoginResponse {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  data?: AdminLoginResponse;
  /** 时间戳 */
  timestamp?: number;
  success?: boolean;
}

/** 应用版本新增/修改请求 */
export interface AppVersionSaveRequest {
  /** 版本ID（修改时传入） */
  id?: number;
  /** 应用类型：web, android, ios, desktop, chrome */
  appType: string;
  /** 版本号 */
  versionCode: string;
  /** 版本数字（用于比较） */
  versionNumber?: number;
  /** 版本标题 */
  title?: string;
  /** 更新公告内容 */
  announcement?: string;
  /** 更新内容描述（Markdown格式） */
  content?: string;
  /** 升级指南链接 */
  guideUrl?: string;
  /** 下载链接 */
  downloadUrl?: string;
  /** 安装包大小（字节） */
  packageSize?: number;
  /** 安装包MD5校验值 */
  packageMd5?: string;
  /** 是否强制更新：0-否，1-是 */
  forceUpdate?: number;
  /** 最低支持版本号 */
  minSupportVersion?: string;
  /** 备注 */
  remark?: string;
}

/** 创建管理员用户请求 */
export interface AdminUserCreateRequest {
  /** 用户名 */
  username: string;
  /** 登录密码（明文，将在服务端 BCrypt 加密） */
  password: string;
  /** 昵称 */
  nickname?: string;
  /** 备注 */
  remark?: string;
}

/** 用户信息 */
export interface AdminUserResponse {
  /** 用户ID */
  id?: number;
  /** 邮箱 */
  email?: string;
  /** 昵称 */
  nickname?: string;
  /** 头像URL */
  avatar?: string;
  /** 手机号 */
  phone?: string;
  /** 用户状态：0-禁用，1-正常 */
  status?: number;
  /** 邮箱是否验证：0-未验证，1-已验证 */
  emailVerified?: number;
  /** 是否绑定谷歌验证 */
  googleAuthBound?: number;
  /** 当前所属团队ID */
  currentTeamId?: number;
  /** 当前会员等级 */
  membershipLevel?: number;
  /** 最后登录时间 */
  lastLoginTime?: string;
  /** 最后登录IP */
  lastLoginIp?: string;
  /** 注册来源 */
  registerSource?: string;
  /** 备注 */
  remark?: string;
  /** 创建时间 */
  createTime?: string;
}

/** 统一响应结果 */
export interface ResultAdminUserResponse {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  data?: AdminUserResponse;
  /** 时间戳 */
  timestamp?: number;
  success?: boolean;
}

/** 用户查询请求 */
export interface AdminUserQueryRequest {
  /** 页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 关键词（邮箱/昵称） */
  keyword?: string;
  /** 用户状态：0-禁用，1-正常 */
  status?: number;
  /** 会员等级：0-免费版，1-基础版，2-专业版，3-企业版，4-旗舰版 */
  membershipLevel?: number;
  /** 注册来源：self-自主注册，invite-邀请注册 */
  registerSource?: string;
}

/** 分页响应结果 */
export interface PageResultAdminUserResponse {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  /** 响应数据 */
  data?: Array<AdminUserResponse>;
  /** 时间戳 */
  timestamp?: number;
  /** 当前页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 总记录数 */
  total?: number;
  /** 总页数 */
  pages?: number;
  success?: boolean;
}

/** 统一响应结果 */
export interface ResultListTranslateRoute {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  /** 响应数据 */
  data?: Array<TranslateRoute>;
  /** 时间戳 */
  timestamp?: number;
  success?: boolean;
}

/** 统一响应结果 */
export interface ResultTokenRechargeOrder {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  data?: TokenRechargeOrder;
  /** 时间戳 */
  timestamp?: number;
  success?: boolean;
}

/** 响应数据 */
export interface TokenRechargeOrder {
  id?: number;
  createTime?: string;
  updateTime?: string;
  deleted?: number;
  orderNo?: string;
  teamId?: number;
  userId?: number;
  tokensAmount?: number;
  originalPrice?: number;
  discountRate?: number;
  actualPrice?: number;
  currency?: string;
  paymentMethod?: string;
  paymentOrderId?: string;
  paymentUrl?: string;
  paymentStatus?: string;
  paymentTime?: string;
  paymentAmount?: number;
  paymentCoinCode?: string;
  paymentChainCode?: string;
  paymentAddress?: string;
  paymentTxHash?: string;
  status?: number;
  remark?: string;
  paid?: boolean;
  pending?: boolean;
  expired?: boolean;
}

/** 订单查询请求 */
export interface AdminOrderQueryRequest {
  /** 页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 订单号 */
  orderNo?: string;
  /** 团队ID */
  teamId?: number;
  /** 用户ID */
  userId?: number;
  /** 订单状态 */
  status?: number;
  /** 支付状态 */
  paymentStatus?: string;
  /** 支付方式 */
  paymentMethod?: string;
}

/** 分页响应结果 */
export interface PageResultTokenRechargeOrder {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  /** 响应数据 */
  data?: Array<TokenRechargeOrder>;
  /** 时间戳 */
  timestamp?: number;
  /** 当前页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 总记录数 */
  total?: number;
  /** 总页数 */
  pages?: number;
  success?: boolean;
}

/** 统一响应结果 */
export interface ResultListTokenPricePackage {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  /** 响应数据 */
  data?: Array<TokenPricePackage>;
  /** 时间戳 */
  timestamp?: number;
  success?: boolean;
}

/** Token异常监测记录查询请求 */
export interface AdminTokenAlertRecordQueryRequest {
  /** 页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 监测配置ID */
  alertConfigId?: number;
  /** 团队ID */
  teamId?: number;
  /** 用户ID */
  userId?: number;
  /** 告警状态：sent-已发送，failed-发送失败 */
  alertStatus?: string;
  /** 开始时间 */
  startTime?: string;
  /** 结束时间 */
  endTime?: string;
}

/** 分页响应结果 */
export interface PageResultTokenAlertRecord {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  /** 响应数据 */
  data?: Array<TokenAlertRecord>;
  /** 时间戳 */
  timestamp?: number;
  /** 当前页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 总记录数 */
  total?: number;
  /** 总页数 */
  pages?: number;
  success?: boolean;
}

/** 响应数据 */
export interface TokenAlertRecord {
  id?: number;
  createTime?: string;
  updateTime?: string;
  deleted?: number;
  alertConfigId?: number;
  teamId?: number;
  userId?: number;
  timeWindowType?: string;
  timeWindowValue?: number;
  threshold?: number;
  actualConsumption?: number;
  startTime?: string;
  endTime?: string;
  alertEmail?: string;
  alertStatus?: string;
  alertMessage?: string;
}

/** Token异常监测配置查询请求 */
export interface AdminTokenAlertConfigQueryRequest {
  /** 页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 团队ID */
  teamId?: number;
  /** 用户ID */
  userId?: number;
  /** 是否启用：0-禁用，1-启用 */
  isEnabled?: number;
}

/** 分页响应结果 */
export interface PageResultTokenAlertConfig {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  /** 响应数据 */
  data?: Array<TokenAlertConfig>;
  /** 时间戳 */
  timestamp?: number;
  /** 当前页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 总记录数 */
  total?: number;
  /** 总页数 */
  pages?: number;
  success?: boolean;
}

/** 统一响应结果 */
export interface ResultListTokenAlertConfig {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  /** 响应数据 */
  data?: Array<TokenAlertConfig>;
  /** 时间戳 */
  timestamp?: number;
  success?: boolean;
}

/** 团队信息 */
export interface AdminTeamResponse {
  /** 团队ID */
  id?: number;
  /** 团队名称 */
  name?: string;
  /** 团队描述 */
  description?: string;
  /** 团队Logo URL */
  logo?: string;
  /** 团队所有者用户ID */
  ownerId?: number;
  /** 团队所有者邮箱 */
  ownerEmail?: string;
  /** 团队状态：0-禁用，1-正常 */
  status?: number;
  /** 最大成员数 */
  maxMembers?: number;
  /** 当前成员数 */
  currentMembers?: number;
  /** 创建时间 */
  createTime?: string;
  /** Token余额（剩余可用） */
  tokenBalance?: number;
  /** 已使用Token总量 */
  usedTokens?: number;
  /** 总获得Token数量 */
  totalTokens?: number;
}

/** 统一响应结果 */
export interface ResultAdminTeamResponse {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  data?: AdminTeamResponse;
  /** 时间戳 */
  timestamp?: number;
  success?: boolean;
}

/** 团队用户列表查询请求 */
export interface AdminTeamUserQueryRequest {
  /** 页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 关键词（用户邮箱或昵称） */
  keyword?: string;
}

/** 团队用户信息 */
export interface AdminTeamUserResponse {
  /** 用户ID */
  userId?: number;
  /** 用户邮箱 */
  email?: string;
  /** 用户昵称 */
  nickname?: string;
  /** 用户头像 */
  avatar?: string;
  /** 用户状态：0-禁用，1-正常 */
  status?: number;
  /** 团队角色：owner-所有者，admin-管理员，member-普通成员 */
  role?: string;
  /** 加入团队时间 */
  joinTime?: string;
  /** 注册时间 */
  registerTime?: string;
  /** 最近登录时间 */
  lastLoginTime?: string;
  /** 累计使用Tokens数量 */
  usedTokens?: number;
  /** 今日使用量 */
  todayUsed?: number;
  /** 本月使用量 */
  monthUsed?: number;
  /** 最后使用时间 */
  lastUsedTime?: string;
}

/** 分页响应结果 */
export interface PageResultAdminTeamUserResponse {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  /** 响应数据 */
  data?: Array<AdminTeamUserResponse>;
  /** 时间戳 */
  timestamp?: number;
  /** 当前页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 总记录数 */
  total?: number;
  /** 总页数 */
  pages?: number;
  success?: boolean;
}

/** 用户Tokens使用记录分页查询请求 */
export interface AdminTokensRecordQueryRequest {
  /** 页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 用户ID */
  userId?: number;
  /** 操作类型：recharge-充值，consume-消费，refund-退款，expire-过期 */
  type?: string;
  /** 使用场景：ai_translate-翻译，ai_chat-客服对话 */
  scene?: string;
  /** AI模型 */
  model?: string;
  /** 开始时间 */
  startTime?: string;
  /** 结束时间 */
  endTime?: string;
}

/** 用户Tokens使用记录 */
export interface AdminTokensRecordResponse {
  /** 记录ID */
  id?: number;
  /** 团队ID */
  teamId?: number;
  /** 用户ID */
  userId?: number;
  /** 用户邮箱 */
  userEmail?: string;
  /** 用户昵称 */
  userNickname?: string;
  /** 操作类型：recharge-充值，consume-消费，refund-退款，expire-过期 */
  type?: string;
  /** 变动数量（正数为增加，负数为减少） */
  amount?: number;
  /** 变动前余额 */
  beforeBalance?: number;
  /** 变动后余额 */
  afterBalance?: number;
  /** 使用场景：ai_translate-翻译，ai_chat-客服对话 */
  scene?: string;
  /** 使用的AI模型 */
  model?: string;
  /** 关联业务ID */
  bizId?: number;
  /** 关联的会员记录ID */
  membershipId?: number;
  /** 关联的订单ID */
  orderId?: number;
  /** 备注 */
  remark?: string;
  /** 记录创建时间 */
  createTime?: string;
}

/** 分页响应结果 */
export interface PageResultAdminTokensRecordResponse {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  /** 响应数据 */
  data?: Array<AdminTokensRecordResponse>;
  /** 时间戳 */
  timestamp?: number;
  /** 当前页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 总记录数 */
  total?: number;
  /** 总页数 */
  pages?: number;
  success?: boolean;
}

/** 团队查询请求 */
export interface AdminTeamQueryRequest {
  /** 页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 关键词（团队名称） */
  keyword?: string;
  /** 团队状态：0-禁用，1-正常 */
  status?: number;
}

/** 分页响应结果 */
export interface PageResultAdminTeamResponse {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  /** 响应数据 */
  data?: Array<AdminTeamResponse>;
  /** 时间戳 */
  timestamp?: number;
  /** 当前页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 总记录数 */
  total?: number;
  /** 总页数 */
  pages?: number;
  success?: boolean;
}

/** 统一响应结果 */
export interface ResultListSystemConfig {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  /** 响应数据 */
  data?: Array<SystemConfig>;
  /** 时间戳 */
  timestamp?: number;
  success?: boolean;
}

/** 快捷回复分页查询请求 */
export interface AdminShortcutReplyQueryRequest {
  /** 页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 团队ID */
  teamId?: number;
  /** 用户ID */
  userId?: number;
  /** 回复范围：team-团队版，personal-个人版 */
  replyScope?: string;
  /** 关键词（标题/内容） */
  keyword?: string;
  /** 创建开始时间 */
  startTime?: string;
  /** 创建结束时间 */
  endTime?: string;
}

/** 快捷回复分页响应（按团队聚合，子列表为该团队下各用户的快捷回复） */
export interface AdminShortcutReplyResponse {
  /** 团队ID，个人版时为null */
  teamId?: number;
  /** 团队名称，个人版时为'个人版' */
  teamName?: string;
  /** 该团队/用户下的快捷回复总数 */
  teamReplyCount?: number;
  /** 用户快捷回复列表（子级，按用户分组） */
  subList?: Array<UserShortcutReplyItem>;
}

/** 分页响应结果 */
export interface PageResultAdminShortcutReplyResponse {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  /** 响应数据 */
  data?: Array<AdminShortcutReplyResponse>;
  /** 时间戳 */
  timestamp?: number;
  /** 当前页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 总记录数 */
  total?: number;
  /** 总页数 */
  pages?: number;
  success?: boolean;
}

/** 快捷回复详情 */
export interface ShortcutReplyDetail {
  /** 快捷回复ID */
  id?: number;
  /** 回复范围：team-团队版，personal-个人版 */
  replyScope?: string;
  /** 快捷回复名称/标题 */
  title?: string;
  /** 回复内容 */
  content?: string;
  /** 附件类型：none-无，image-图片，video-视频，file-文件 */
  attachmentType?: string;
  /** 附件URL */
  attachmentUrl?: string;
  /** 附件名称 */
  attachmentName?: string;
  /** 快捷键 */
  shortcut?: string;
  /** 使用次数 */
  useCount?: number;
  /** 排序 */
  sort?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
}

/** 用户快捷回复子项 */
export interface UserShortcutReplyItem {
  /** 用户ID */
  userId?: number;
  /** 用户邮箱 */
  userEmail?: string;
  /** 用户昵称 */
  userNickname?: string;
  /** 该用户的快捷回复数量 */
  count?: number;
  /** 该用户的快捷回复记录列表 */
  items?: Array<ShortcutReplyDetail>;
}

/** 提醒通知分页查询请求 */
export interface AdminReminderNotificationQueryRequest {
  /** 页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 团队ID */
  teamId?: number;
  /** 用户ID */
  userId?: number;
  /** 通知状态：draft-草稿，pending-即将到来，sent-已通知 */
  status?: string;
  /** 是否已读：0-未读，1-已读 */
  isRead?: number;
  /** 关键词（通知标题/内容） */
  keyword?: string;
  /** 创建开始时间 */
  startTime?: string;
  /** 创建结束时间 */
  endTime?: string;
}

/** 提醒通知分页响应（按团队聚合，子列表为该团队下各用户的通知） */
export interface AdminReminderNotificationResponse {
  /** 团队ID */
  teamId?: number;
  /** 团队名称 */
  teamName?: string;
  /** 该团队下的通知总数 */
  teamNotificationCount?: number;
  /** 用户通知列表（子级，按用户分组） */
  subList?: Array<UserNotificationItem>;
}

/** 提醒通知详情 */
export interface NotificationDetail {
  /** 通知ID */
  id?: number;
  /** 通知标题 */
  title?: string;
  /** 通知内容 */
  content?: string;
  /** 提醒时间 */
  reminderTime?: string;
  /** 状态：draft-草稿，pending-即将到来，sent-已通知 */
  status?: string;
  /** 是否已读：0-未读，1-已读 */
  isRead?: number;
  /** 阅读时间 */
  readTime?: string;
  /** 提醒发送时间 */
  reminderSentTime?: string;
  /** 创建时间 */
  createTime?: string;
}

/** 分页响应结果 */
export interface PageResultAdminReminderNotificationResponse {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  /** 响应数据 */
  data?: Array<AdminReminderNotificationResponse>;
  /** 时间戳 */
  timestamp?: number;
  /** 当前页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 总记录数 */
  total?: number;
  /** 总页数 */
  pages?: number;
  success?: boolean;
}

/** 用户提醒通知子项 */
export interface UserNotificationItem {
  /** 用户ID */
  userId?: number;
  /** 用户邮箱 */
  userEmail?: string;
  /** 用户昵称 */
  userNickname?: string;
  /** 该用户的通知数量 */
  count?: number;
  /** 该用户的通知记录列表 */
  items?: Array<NotificationDetail>;
}

/** 统一响应结果 */
export interface ResultListMembershipPlan {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  /** 响应数据 */
  data?: Array<MembershipPlan>;
  /** 时间戳 */
  timestamp?: number;
  success?: boolean;
}

/** 响应数据 */
export interface MembershipOrder {
  id?: number;
  createTime?: string;
  updateTime?: string;
  deleted?: number;
  orderNo?: string;
  teamId?: number;
  userId?: number;
  planId?: number;
  planLevel?: number;
  planName?: string;
  subscriptionType?: string;
  originalPrice?: number;
  discountRate?: number;
  actualPrice?: number;
  currency?: string;
  tokensAmount?: number;
  paymentMethod?: string;
  paymentOrderId?: string;
  paymentUrl?: string;
  paymentStatus?: string;
  paymentTime?: string;
  paymentAmount?: number;
  paymentCoinCode?: string;
  paymentChainCode?: string;
  paymentAddress?: string;
  paymentTxHash?: string;
  notifyUrl?: string;
  notifyCount?: number;
  notifyTime?: string;
  status?: number;
  membershipId?: number;
  expireTime?: string;
  remark?: string;
  paid?: boolean;
  pending?: boolean;
  expired?: boolean;
}

/** 统一响应结果 */
export interface ResultMembershipOrder {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  data?: MembershipOrder;
  /** 时间戳 */
  timestamp?: number;
  success?: boolean;
}

/** 分页响应结果 */
export interface PageResultMembershipOrder {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  /** 响应数据 */
  data?: Array<MembershipOrder>;
  /** 时间戳 */
  timestamp?: number;
  /** 当前页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 总记录数 */
  total?: number;
  /** 总页数 */
  pages?: number;
  success?: boolean;
}

/** 用户登录日志查询请求 */
export interface AdminLoginLogQueryRequest {
  /** 页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 用户ID */
  userId?: number;
  /** 登录账号（邮箱） */
  email?: string;
  /** 关键词（IP地址/IP地区） */
  keyword?: string;
  /** 登录方式：password-密码登录，email-邮箱验证码登录，google-Google登录 */
  loginType?: string;
  /** 登录结果：0-成功，1-失败，2-退出 */
  loginResult?: number;
  /** 开始时间 */
  beginTime?: string;
  /** 结束时间 */
  endTime?: string;
}

/** 响应数据 */
export interface LoginLog {
  id?: number;
  userId?: number;
  email?: string;
  loginIp?: string;
  loginIpRegion?: string;
  userAgent?: string;
  loginDevice?: string;
  loginType?: string;
  loginResult?: number;
  remark?: string;
  createTime?: string;
  updateTime?: string;
}

/** 分页响应结果 */
export interface PageResultLoginLog {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  /** 响应数据 */
  data?: Array<LoginLog>;
  /** 时间戳 */
  timestamp?: number;
  /** 当前页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 总记录数 */
  total?: number;
  /** 总页数 */
  pages?: number;
  success?: boolean;
}

/** 登录失败记录查询请求 */
export interface AdminLoginFailQueryRequest {
  /** 页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 登录账号（邮箱） */
  email?: string;
  /** 锁定状态：0-未锁定，1-已锁定 */
  lockFlag?: number;
}

/** 响应数据 */
export interface LoginFail {
  id?: number;
  userId?: number;
  email?: string;
  loginFailCount?: number;
  lockFlag?: number;
  lockBeginTime?: string;
  lockEndTime?: string;
  createTime?: string;
  updateTime?: string;
  locked?: boolean;
}

/** 分页响应结果 */
export interface PageResultLoginFail {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  /** 响应数据 */
  data?: Array<LoginFail>;
  /** 时间戳 */
  timestamp?: number;
  /** 当前页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 总记录数 */
  total?: number;
  /** 总页数 */
  pages?: number;
  success?: boolean;
}

/** 数据源查询请求 */
export interface AdminDatasourceQueryRequest {
  /** 页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 用户ID */
  userId?: number;
  /** 团队ID */
  teamId?: number;
  /** 关键词（用户邮箱/昵称/团队名称） */
  keyword?: string;
  /** 数据源类型：url/file */
  sourceType?: string;
  /** 向量化状态：0-未处理，1-处理中，2-已完成，3-失败 */
  vectorStatus?: number;
  /** 知识库提供者类型：local/dify/aliyun/volcano */
  kbProviderType?: string;
}

/** 用户数据源详情响应 */
export interface AdminUserDatasourceResponse {
  /** 团队名称 */
  teamName?: string;
  /** 团队ID */
  teamId?: number;
  /** 用户账号（邮箱） */
  userEmail?: string;
  /** 用户ID */
  userId?: number;
  /** 用户昵称 */
  nickname?: string;
  /** 注册时间 */
  registerTime?: string;
  /** 最近登录时间 */
  lastLoginTime?: string;
  /** Token余额 */
  tokenBalance?: number;
  /** 已使用Token */
  usedTokens?: number;
  /** 数据源列表 */
  datasources?: Array<DatasourceInfo>;
}

/** 数据源信息 */
export interface DatasourceInfo {
  /** 数据源ID */
  datasourceId?: number;
  /** 数据源类型：url/file */
  sourceType?: string;
  /** 标题 */
  title?: string;
  /** 数据源URL（文件类型为文件存储URL，URL类型为网页URL） */
  datasourceUrl?: string;
  /** 字符数 */
  charCount?: number;
  /** 向量化状态：0-未处理，1-处理中，2-已完成，3-失败 */
  vectorStatus?: number;
  /** 向量化状态描述 */
  vectorStatusName?: string;
  /** 向量化时间 */
  vectorTime?: string;
  /** AI是否已使用：0-未使用，1-已使用 */
  isAiUsed?: number;
  /** 块数量 */
  chunkCount?: number;
  /** 知识库提供者类型 */
  kbProviderType?: string;
  /** 是否已执行知识库切换：0-未切换，1-已切换 */
  status?: number;
  /** 创建时间 */
  createTime?: string;
}

/** 分页响应结果 */
export interface PageResultAdminUserDatasourceResponse {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  /** 响应数据 */
  data?: Array<AdminUserDatasourceResponse>;
  /** 时间戳 */
  timestamp?: number;
  /** 当前页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 总记录数 */
  total?: number;
  /** 总页数 */
  pages?: number;
  success?: boolean;
}

/** 仪表盘统计数据 */
export interface DashboardStatsResponse {
  /** 用户总数 */
  totalUsers?: number;
  /** 今日新增用户数 */
  todayNewUsers?: number;
  /** 团队总数 */
  totalTeams?: number;
  /** 活跃会员数 */
  activeMemberships?: number;
  /** 今日订单数 */
  todayOrders?: number;
  /** 今日营收（USD） */
  todayRevenue?: number;
  /** 本月营收（USD） */
  monthRevenue?: number;
  /** 总营收（USD） */
  totalRevenue?: number;
  /** 各会员等级用户数分布 */
  membershipDistribution?: Array<Record<string, Record<string, unknown>>>;
  /** 最近7天新增用户趋势 */
  userTrend?: Array<Record<string, Record<string, unknown>>>;
  /** 最近7天订单趋势 */
  orderTrend?: Array<Record<string, Record<string, unknown>>>;
}

/** 统一响应结果 */
export interface ResultDashboardStatsResponse {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  data?: DashboardStatsResponse;
  /** 时间戳 */
  timestamp?: number;
  success?: boolean;
}

/** 统一响应结果 */
export interface ResultListAiChatbotRoute {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  /** 响应数据 */
  data?: Array<AiChatbotRoute>;
  /** 时间戳 */
  timestamp?: number;
  success?: boolean;
}

/** AI聊天机器人预览对话查询请求 */
export interface AdminChatbotPreviewChatQueryRequest {
  /** 页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 用户ID */
  userId?: number;
  /** 会话ID（精确匹配） */
  sessionId?: string;
}

/** 预览对话session信息 */
export interface AdminChatbotPreviewChatResponse {
  /** 会话ID */
  sessionId?: string;
  /** 用户ID */
  userId?: number;
  /** 会话开始时间 */
  sessionStartTime?: string;
  /** 会话最后消息时间 */
  sessionLastTime?: string;
  /** 本会话消耗Tokens总量 */
  totalTokensConsumed?: number;
  /** 一问一答列表 */
  qaPairs?: Array<QaPair>;
}

/** 分页响应结果 */
export interface PageResultAdminChatbotPreviewChatResponse {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  /** 响应数据 */
  data?: Array<AdminChatbotPreviewChatResponse>;
  /** 时间戳 */
  timestamp?: number;
  /** 当前页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 总记录数 */
  total?: number;
  /** 总页数 */
  pages?: number;
  success?: boolean;
}

/** 一问一答对 */
export interface QaPair {
  /** 用户提问内容 */
  userMessage?: string;
  /** AI回答内容 */
  assistantMessage?: string;
  /** 本次消耗Tokens */
  tokensConsumed?: number;
  /** 响应时间（毫秒） */
  responseTime?: number;
  /** 匹配类型：faq/rag/ai/default */
  matchType?: string;
  /** 提问时间 */
  askTime?: string;
  /** 回答时间 */
  replyTime?: string;
}

/** AI聊天机器人对话日志查询请求 */
export interface AdminChatbotChatLogQueryRequest {
  /** 页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 用户ID */
  userId?: number;
  /** 社交账号ID */
  socialAccountId?: number;
  /** 对话ID */
  conversationId?: number;
  /** 第三方社交媒体平台联系人ID */
  platformContactId?: string;
  /** 匹配类型：faq/rag/ai/default */
  matchType?: string;
  /** 状态：0-失败，1-成功，2-待处理 */
  status?: number;
  /** 开始时间 */
  startTime?: string;
  /** 结束时间 */
  endTime?: string;
}

/** 响应数据 */
export interface AiChatbotChatLog {
  id?: number;
  userId?: number;
  socialAccountId?: number;
  conversationId?: number;
  platformContactId?: string;
  userMessage?: string;
  botReply?: string;
  aiModel?: string;
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
  responseTime?: number;
  matchType?: string;
  matchSourceId?: number;
  similarityScore?: number;
  referenceChunks?: string;
  isSent?: number;
  sendTime?: string;
  status?: number;
  errorMessage?: string;
  createTime?: string;
}

/** 分页响应结果 */
export interface PageResultAiChatbotChatLog {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  /** 响应数据 */
  data?: Array<AiChatbotChatLog>;
  /** 时间戳 */
  timestamp?: number;
  /** 当前页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 总记录数 */
  total?: number;
  /** 总页数 */
  pages?: number;
  success?: boolean;
}

/** 广播消息接收者分页查询请求 */
export interface AdminBroadcastMessageRecipientQueryRequest {
  /** 页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 广播消息ID（必填） */
  broadcastId: number;
  /** 发送状态：pending-待发送，sending-发送中，sent-已发送，failed-发送失败，skipped-已跳过 */
  status?: string;
  /** 关键词（接收者姓名/手机号/WhatsApp ID） */
  keyword?: string;
  /** 发送开始时间 */
  startTime?: string;
  /** 发送结束时间 */
  endTime?: string;
}

/** 广播消息接收者响应 */
export interface AdminBroadcastMessageRecipientResponse {
  /** 接收者记录ID */
  id?: number;
  /** 广播消息ID */
  broadcastId?: number;
  /** 账户ID */
  accountId?: string;
  /** 接收者姓名 */
  recipientName?: string;
  /** 接收者WhatsApp ID */
  recipientWhatsappId?: string;
  /** 接收者手机号 */
  recipientPhone?: string;
  /** 发送状态：pending-待发送，sending-发送中，sent-已发送，failed-发送失败，skipped-已跳过 */
  status?: string;
  /** 实际发送时间 */
  sentTime?: string;
  /** 重试次数 */
  retryCount?: number;
  /** 错误信息 */
  errorMessage?: string;
  /** 错误代码 */
  errorCode?: string;
  /** 排序序号（发送顺序） */
  sortOrder?: number;
  /** 创建时间 */
  createTime?: string;
}

/** 分页响应结果 */
export interface PageResultAdminBroadcastMessageRecipientResponse {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  /** 响应数据 */
  data?: Array<AdminBroadcastMessageRecipientResponse>;
  /** 时间戳 */
  timestamp?: number;
  /** 当前页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 总记录数 */
  total?: number;
  /** 总页数 */
  pages?: number;
  success?: boolean;
}

/** 广播消息模板分页查询请求 */
export interface AdminBroadcastMessageTemplateQueryRequest {
  /** 页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 团队ID */
  teamId?: number;
  /** 用户ID */
  userId?: number;
  /** 模板状态：0-禁用，1-启用 */
  status?: number;
  /** 关键词（模板名称/描述） */
  keyword?: string;
  /** 创建开始时间 */
  startTime?: string;
  /** 创建结束时间 */
  endTime?: string;
}

/** 广播消息模板分页响应（按团队聚合，子列表为该团队下各用户的模板） */
export interface AdminBroadcastMessageTemplateResponse {
  /** 团队ID，个人版时为null */
  teamId?: number;
  /** 团队名称，个人版时为'个人版' */
  teamName?: string;
  /** 该团队/用户下的模板总数 */
  teamTemplateCount?: number;
  /** 用户模板列表（子级，按用户分组） */
  subList?: Array<UserTemplateItem>;
}

/** 分页响应结果 */
export interface PageResultAdminBroadcastMessageTemplateResponse {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  /** 响应数据 */
  data?: Array<AdminBroadcastMessageTemplateResponse>;
  /** 时间戳 */
  timestamp?: number;
  /** 当前页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 总记录数 */
  total?: number;
  /** 总页数 */
  pages?: number;
  success?: boolean;
}

/** 广播消息模板详情 */
export interface TemplateDetail {
  /** 模板ID */
  id?: number;
  /** 模板名称 */
  name?: string;
  /** 消息内容（JSON格式） */
  messageContents?: string;
  /** 是否包含附件：0-否，1-是 */
  hasAttachment?: number;
  /** 附件类型：image-图片，video-视频，file-文件，mixed-混合 */
  attachmentType?: string;
  /** 使用次数 */
  useCount?: number;
  /** 是否启用：0-禁用，1-启用 */
  status?: number;
  /** 描述/备注 */
  description?: string;
  /** 排序序号 */
  sortOrder?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
}

/** 用户广播模板子项 */
export interface UserTemplateItem {
  /** 用户ID */
  userId?: number;
  /** 用户邮箱 */
  userEmail?: string;
  /** 用户昵称 */
  userNickname?: string;
  /** 该用户的模板数量 */
  count?: number;
  /** 该用户的模板记录列表 */
  items?: Array<TemplateDetail>;
}

/** 广播消息分页查询请求 */
export interface AdminBroadcastMessageQueryRequest {
  /** 页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 团队ID */
  teamId?: number;
  /** 用户ID（发送者） */
  userId?: number;
  /** 发送状态：draft-草稿，pending-待发送，sending-发送中，paused-已暂停，completed-已完成，cancelled-已取消 */
  status?: string;
  /** 关键词（消息标题） */
  keyword?: string;
  /** 创建开始时间 */
  startTime?: string;
  /** 创建结束时间 */
  endTime?: string;
}

/** 广播消息分页响应（按团队聚合，子列表为该团队下各用户的广播消息） */
export interface AdminBroadcastMessageResponse {
  /** 团队ID */
  teamId?: number;
  /** 团队名称 */
  teamName?: string;
  /** 该团队下的广播消息总数 */
  teamBroadcastCount?: number;
  /** 用户广播消息列表（子级，按用户分组） */
  subList?: Array<UserBroadcastMessageItem>;
}

/** 广播消息详情（含接收者汇总，接收者明细通过子表接口查询） */
export interface BroadcastMessageDetail {
  /** 广播消息ID */
  id?: number;
  /** 消息标题 */
  title?: string;
  /** 发送目标类型：group-分组，tag-标签，mixed-混合 */
  targetType?: string;
  /** 接收者总数 */
  recipientCount?: number;
  /** 成功发送数量 */
  sentCount?: number;
  /** 发送失败数量 */
  failedCount?: number;
  /** 发送状态：draft-草稿，pending-待发送，sending-发送中，paused-已暂停，completed-已完成，cancelled-已取消 */
  status?: string;
  /** 计划发送时间 */
  scheduledTime?: string;
  /** 实际开始时间 */
  startTime?: string;
  /** 结束时间 */
  endTime?: string;
  /** 使用的模板ID */
  templateId?: number;
  /** 错误信息 */
  errorMessage?: string;
  /** 备注 */
  remark?: string;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
}

/** 分页响应结果 */
export interface PageResultAdminBroadcastMessageResponse {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  /** 响应数据 */
  data?: Array<AdminBroadcastMessageResponse>;
  /** 时间戳 */
  timestamp?: number;
  /** 当前页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 总记录数 */
  total?: number;
  /** 总页数 */
  pages?: number;
  success?: boolean;
}

/** 用户广播消息子项 */
export interface UserBroadcastMessageItem {
  /** 用户ID */
  userId?: number;
  /** 用户邮箱 */
  userEmail?: string;
  /** 用户昵称 */
  userNickname?: string;
  /** 该用户的广播消息数量 */
  count?: number;
  /** 该用户的广播消息记录列表 */
  items?: Array<BroadcastMessageDetail>;
}

/** 自动回复规则分页查询请求 */
export interface AdminAutoReplyRuleQueryRequest {
  /** 页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 团队ID */
  teamId?: number;
  /** 用户ID */
  userId?: number;
  /** 规则范围：team-团队版，personal-个人版 */
  ruleScope?: string;
  /** 规则类型：keyword-关键词匹配，unified-统一回复 */
  ruleType?: string;
  /** 启用状态：0-禁用，1-启用 */
  defaultEnabled?: number;
  /** 关键词（规则名称/关键词） */
  keyword?: string;
  /** 创建开始时间 */
  startTime?: string;
  /** 创建结束时间 */
  endTime?: string;
}

/** 自动回复规则分页响应（按团队聚合，子列表为该团队下各用户的规则） */
export interface AdminAutoReplyRuleResponse {
  /** 团队ID，个人版时为null */
  teamId?: number;
  /** 团队名称，个人版时为'个人版' */
  teamName?: string;
  /** 该团队/用户下的规则总数 */
  teamRuleCount?: number;
  /** 用户规则列表（子级，按用户分组） */
  subList?: Array<UserAutoReplyRuleItem>;
}

/** 自动回复规则详情 */
export interface AutoReplyRuleDetail {
  /** 规则ID */
  id?: number;
  /** 规则范围：team-团队版，personal-个人版 */
  ruleScope?: string;
  /** 规则名称 */
  name?: string;
  /** 规则类型：keyword-关键词匹配，unified-统一回复 */
  ruleType?: string;
  /** 触发关键词（多个用|分隔） */
  keywords?: string;
  /** 匹配模式：exact-精确匹配，fuzzy-模糊匹配 */
  matchMode?: string;
  /** 回复内容 */
  replyContent?: string;
  /** 是否默认启用：0-禁用，1-启用 */
  defaultEnabled?: number;
  /** 优先级 */
  priority?: number;
  /** 触发次数 */
  triggerCount?: number;
  /** 在进行中的聊天中无效：0-否，1-是 */
  disableInActiveChat?: number;
  /** 回复后归档会话：0-否，1-是 */
  archiveAfterReply?: number;
  /** 备注 */
  remark?: string;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
}

/** 分页响应结果 */
export interface PageResultAdminAutoReplyRuleResponse {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  /** 响应数据 */
  data?: Array<AdminAutoReplyRuleResponse>;
  /** 时间戳 */
  timestamp?: number;
  /** 当前页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 总记录数 */
  total?: number;
  /** 总页数 */
  pages?: number;
  success?: boolean;
}

/** 用户自动回复规则子项 */
export interface UserAutoReplyRuleItem {
  /** 用户ID */
  userId?: number;
  /** 用户邮箱 */
  userEmail?: string;
  /** 用户昵称 */
  userNickname?: string;
  /** 该用户的规则数量 */
  count?: number;
  /** 该用户的规则记录列表 */
  items?: Array<AutoReplyRuleDetail>;
}

/** 分页响应结果 */
export interface PageResultAppVersion {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  /** 响应数据 */
  data?: Array<AppVersion>;
  /** 时间戳 */
  timestamp?: number;
  /** 当前页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 总记录数 */
  total?: number;
  /** 总页数 */
  pages?: number;
  success?: boolean;
}

/** 管理员用户分页查询请求 */
export interface AdminAdminUserQueryRequest {
  /** 页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 用户名/昵称关键词 */
  keyword?: string;
  /** 状态：0-启用，1-禁用 */
  status?: number;
}

/** 分页响应结果 */
export interface PageResultAdminUserInfoResponse {
  /** 响应码，0表示成功，其他表示失败 */
  code?: number;
  /** 响应消息 */
  message?: string;
  /** 响应数据 */
  data?: Array<AdminUserInfoResponse>;
  /** 时间戳 */
  timestamp?: number;
  /** 当前页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 总记录数 */
  total?: number;
  /** 总页数 */
  pages?: number;
  success?: boolean;
}

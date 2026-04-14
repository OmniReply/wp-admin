import type { ResourceMeta } from '@/types/common';

export interface SidebarItem {
  label: string;
  path: string;
}

export interface SidebarGroup {
  title: string;
  items: SidebarItem[];
}

export const resourceMetaMap: Record<string, ResourceMeta> = {
  "admin-user": {
    "key": "admin-user",
    "label": "管理员用户管理",
    "route": "/admin-user",
    "itemType": "AdminUserInfoResponse",
    "listParamsType": "AdminUserListParams",
    "saveType": "AdminUserCreateRequest",
    "tableFields": [
      {
        "name": "id",
        "label": "用户ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "username",
        "label": "用户名",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "status",
        "label": "状态：0-启用，1-禁用",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "role",
        "label": "角色：SUPER_ADMIN-超级管理员，ADMIN-普通管理员",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "createTime",
        "label": "创建时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "lastLoginIp",
        "label": "最近登录IP",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "lastLoginTime",
        "label": "最近登录时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      }
    ],
    "detailFields": [
      {
        "name": "id",
        "label": "用户ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "username",
        "label": "用户名",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "nickname",
        "label": "昵称",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "role",
        "label": "角色：SUPER_ADMIN-超级管理员，ADMIN-普通管理员",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "status",
        "label": "状态：0-启用，1-禁用",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "remark",
        "label": "备注",
        "kind": "textarea",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "lastLoginTime",
        "label": "最近登录时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "lastLoginIp",
        "label": "最近登录IP",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "createTime",
        "label": "创建时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      }
    ],
    "formFields": [
      {
        "name": "username",
        "label": "用户名",
        "kind": "text",
        "required": true,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "password",
        "label": "登录密码（明文，将在服务端 BCrypt 加密）",
        "kind": "text",
        "required": true,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "nickname",
        "label": "昵称",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "remark",
        "label": "备注",
        "kind": "textarea",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      }
    ],
    "filters": [
      {
        "name": "keyword",
        "label": "用户名/昵称关键词",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "status",
        "label": "状态：0-启用，1-禁用",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      }
    ],
    "actions": [],
    "hasList": true,
    "hasDetail": true,
    "hasSave": true,
    "hasDelete": true
  },
  "app-version": {
    "key": "app-version",
    "label": "应用版本管理",
    "route": "/app-version",
    "itemType": "AppVersion",
    "listParamsType": "AppVersionListParams",
    "saveType": "AppVersionSaveRequest",
    "tableFields": [
      {
        "name": "id",
        "label": "id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "title",
        "label": "title",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "status",
        "label": "status",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "createTime",
        "label": "create Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "updateTime",
        "label": "update Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "announcement",
        "label": "announcement",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "appType",
        "label": "app Type",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      }
    ],
    "detailFields": [
      {
        "name": "id",
        "label": "id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "createTime",
        "label": "create Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "updateTime",
        "label": "update Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "deleted",
        "label": "deleted",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "appType",
        "label": "app Type",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "versionCode",
        "label": "version Code",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "versionNumber",
        "label": "version Number",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "title",
        "label": "title",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "announcement",
        "label": "announcement",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "content",
        "label": "content",
        "kind": "textarea",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "guideUrl",
        "label": "guide Url",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "downloadUrl",
        "label": "download Url",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "packageSize",
        "label": "package Size",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "packageMd5",
        "label": "package Md5",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "forceUpdate",
        "label": "force Update",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "minSupportVersion",
        "label": "min Support Version",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      }
    ],
    "formFields": [
      {
        "name": "appType",
        "label": "应用类型：web, android, ios, desktop, chrome",
        "kind": "text",
        "required": true,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "versionCode",
        "label": "版本号",
        "kind": "text",
        "required": true,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "versionNumber",
        "label": "版本数字（用于比较）",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "title",
        "label": "版本标题",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "announcement",
        "label": "更新公告内容",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "content",
        "label": "更新内容描述（Markdown格式）",
        "kind": "textarea",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "guideUrl",
        "label": "升级指南链接",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "downloadUrl",
        "label": "下载链接",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "packageSize",
        "label": "安装包大小（字节）",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "packageMd5",
        "label": "安装包MD5校验值",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "forceUpdate",
        "label": "是否强制更新：0-否，1-是",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "minSupportVersion",
        "label": "最低支持版本号",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "remark",
        "label": "备注",
        "kind": "textarea",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      }
    ],
    "filters": [
      {
        "name": "appType",
        "label": "app Type",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "status",
        "label": "status",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      }
    ],
    "actions": [
      {
        "name": "publish",
        "label": "发布版本",
        "queryParams": [],
        "pathParam": "id"
      },
      {
        "name": "offline",
        "label": "下架版本",
        "queryParams": [],
        "pathParam": "id"
      }
    ],
    "hasList": true,
    "hasDetail": true,
    "hasSave": true,
    "hasDelete": true
  },
  "auto-reply-rule-page": {
    "key": "auto-reply-rule-page",
    "label": "自动回复规则管理",
    "route": "/auto-reply-rule-page",
    "itemType": "AdminAutoReplyRuleResponse",
    "listParamsType": "AutoReplyRulePageListParams",
    "saveType": null,
    "tableFields": [
      {
        "name": "teamId",
        "label": "团队ID，个人版时为null",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "teamName",
        "label": "团队名称，个人版时为'个人版'",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "teamRuleCount",
        "label": "该团队/用户下的规则总数",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      }
    ],
    "detailFields": [
      {
        "name": "teamId",
        "label": "团队ID，个人版时为null",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "teamName",
        "label": "团队名称，个人版时为'个人版'",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "teamRuleCount",
        "label": "该团队/用户下的规则总数",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      }
    ],
    "formFields": [],
    "filters": [
      {
        "name": "teamId",
        "label": "团队ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "userId",
        "label": "用户ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "ruleScope",
        "label": "规则范围：team-团队版，personal-个人版",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "ruleType",
        "label": "规则类型：keyword-关键词匹配，unified-统一回复",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "defaultEnabled",
        "label": "启用状态：0-禁用，1-启用",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "keyword",
        "label": "关键词（规则名称/关键词）",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "startTime",
        "label": "创建开始时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "endTime",
        "label": "创建结束时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      }
    ],
    "actions": [],
    "hasList": true,
    "hasDetail": false,
    "hasSave": false,
    "hasDelete": false
  },
  "broadcast-message": {
    "key": "broadcast-message",
    "label": "广播消息管理",
    "route": "/broadcast-message",
    "itemType": "AdminBroadcastMessageResponse",
    "listParamsType": "BroadcastMessageListParams",
    "saveType": null,
    "tableFields": [
      {
        "name": "teamBroadcastCount",
        "label": "该团队下的广播消息总数",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "teamId",
        "label": "团队ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "teamName",
        "label": "团队名称",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      }
    ],
    "detailFields": [
      {
        "name": "teamId",
        "label": "团队ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "teamName",
        "label": "团队名称",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "teamBroadcastCount",
        "label": "该团队下的广播消息总数",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      }
    ],
    "formFields": [],
    "filters": [
      {
        "name": "teamId",
        "label": "团队ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "userId",
        "label": "用户ID（发送者）",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "status",
        "label": "发送状态：draft-草稿，pending-待发送，sending-发送中，paused-已暂停，completed-已完成，cancelled-已取消",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "keyword",
        "label": "关键词（消息标题）",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "startTime",
        "label": "创建开始时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "endTime",
        "label": "创建结束时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      }
    ],
    "actions": [],
    "hasList": true,
    "hasDetail": false,
    "hasSave": false,
    "hasDelete": false
  },
  "chatbot-chat-log-page": {
    "key": "chatbot-chat-log-page",
    "label": "AI聊天机器人对话日志",
    "route": "/chatbot-chat-log-page",
    "itemType": "AiChatbotChatLog",
    "listParamsType": "ChatbotChatLogPageListParams",
    "saveType": null,
    "tableFields": [
      {
        "name": "id",
        "label": "id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "status",
        "label": "status",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "createTime",
        "label": "create Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "aiModel",
        "label": "ai Model",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "botReply",
        "label": "bot Reply",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "conversationId",
        "label": "conversation Id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "errorMessage",
        "label": "error Message",
        "kind": "textarea",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      }
    ],
    "detailFields": [
      {
        "name": "id",
        "label": "id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "userId",
        "label": "user Id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "socialAccountId",
        "label": "social Account Id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "conversationId",
        "label": "conversation Id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "platformContactId",
        "label": "platform Contact Id",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "userMessage",
        "label": "user Message",
        "kind": "textarea",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "botReply",
        "label": "bot Reply",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "aiModel",
        "label": "ai Model",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "inputTokens",
        "label": "input Tokens",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "outputTokens",
        "label": "output Tokens",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "totalTokens",
        "label": "total Tokens",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "responseTime",
        "label": "response Time",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "matchType",
        "label": "match Type",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "matchSourceId",
        "label": "match Source Id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "similarityScore",
        "label": "similarity Score",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "referenceChunks",
        "label": "reference Chunks",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      }
    ],
    "formFields": [],
    "filters": [
      {
        "name": "userId",
        "label": "用户ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "socialAccountId",
        "label": "社交账号ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "conversationId",
        "label": "对话ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "platformContactId",
        "label": "第三方社交媒体平台联系人ID",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "matchType",
        "label": "匹配类型：faq/rag/ai/default",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "status",
        "label": "状态：0-失败，1-成功，2-待处理",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "startTime",
        "label": "开始时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "endTime",
        "label": "结束时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      }
    ],
    "actions": [],
    "hasList": true,
    "hasDetail": false,
    "hasSave": false,
    "hasDelete": false
  },
  "chatbot-preview-chat-page": {
    "key": "chatbot-preview-chat-page",
    "label": "AI聊天机器人预览对话",
    "route": "/chatbot-preview-chat-page",
    "itemType": "AdminChatbotPreviewChatResponse",
    "listParamsType": "ChatbotPreviewChatPageListParams",
    "saveType": null,
    "tableFields": [
      {
        "name": "sessionId",
        "label": "会话ID",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "sessionLastTime",
        "label": "会话最后消息时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "sessionStartTime",
        "label": "会话开始时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "totalTokensConsumed",
        "label": "本会话消耗Tokens总量",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "userId",
        "label": "用户ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      }
    ],
    "detailFields": [
      {
        "name": "sessionId",
        "label": "会话ID",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "userId",
        "label": "用户ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "sessionStartTime",
        "label": "会话开始时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "sessionLastTime",
        "label": "会话最后消息时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "totalTokensConsumed",
        "label": "本会话消耗Tokens总量",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      }
    ],
    "formFields": [],
    "filters": [
      {
        "name": "userId",
        "label": "用户ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "sessionId",
        "label": "会话ID（精确匹配）",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      }
    ],
    "actions": [],
    "hasList": true,
    "hasDetail": false,
    "hasSave": false,
    "hasDelete": false
  },
  "chatbot-route": {
    "key": "chatbot-route",
    "label": "AI聊天机器人线路配置管理",
    "route": "/chatbot-route",
    "itemType": "AiChatbotRoute",
    "listParamsType": "ChatbotRouteListParams",
    "saveType": "AdminAiChatbotRouteSaveRequest",
    "tableFields": [
      {
        "name": "id",
        "label": "id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "createTime",
        "label": "create Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "updateTime",
        "label": "update Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "apiKey",
        "label": "api Key",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "apiUrl",
        "label": "api Url",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "defaultRoute",
        "label": "default Route",
        "kind": "switch",
        "required": false,
        "type": "boolean",
        "format": "",
        "options": []
      },
      {
        "name": "deleted",
        "label": "deleted",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      }
    ],
    "detailFields": [
      {
        "name": "id",
        "label": "id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "createTime",
        "label": "create Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "updateTime",
        "label": "update Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "deleted",
        "label": "deleted",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "routeCode",
        "label": "route Code",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "routeName",
        "label": "route Name",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "provider",
        "label": "provider",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "modelCode",
        "label": "model Code",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "apiUrl",
        "label": "api Url",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "apiKey",
        "label": "api Key",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "icon",
        "label": "icon",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "description",
        "label": "description",
        "kind": "textarea",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "maxTokens",
        "label": "max Tokens",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "temperature",
        "label": "temperature",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "tokensRate",
        "label": "tokens Rate",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "isDefault",
        "label": "is Default",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      }
    ],
    "formFields": [
      {
        "name": "routeCode",
        "label": "线路编码（唯一标识）",
        "kind": "text",
        "required": true,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "routeName",
        "label": "线路名称",
        "kind": "text",
        "required": true,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "provider",
        "label": "提供商：openai/aliyun/deepseek/kimi等",
        "kind": "text",
        "required": true,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "modelCode",
        "label": "AI模型代码（如qwen3-max, gpt-4等）",
        "kind": "text",
        "required": true,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "apiUrl",
        "label": "API地址（可选，不填使用默认）",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "apiKey",
        "label": "API密钥（可选，不填使用环境变量配置）",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "icon",
        "label": "图标URL",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "description",
        "label": "线路描述",
        "kind": "textarea",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "maxTokens",
        "label": "最大Token数",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "temperature",
        "label": "温度参数",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "tokensRate",
        "label": "Token消耗倍率",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "isDefault",
        "label": "是否默认线路：0-否，1-是",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "isEnabled",
        "label": "是否启用：0-禁用，1-启用",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "sortOrder",
        "label": "排序序号",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "rerankerMode",
        "label": "重排序模式（本地RAG用）：cohere/jina/bge/none",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      }
    ],
    "filters": [],
    "actions": [
      {
        "name": "toggleEnabled4",
        "label": "启用/禁用AI聊天线路",
        "queryParams": [
          {
            "name": "isEnabled",
            "label": "is Enabled",
            "kind": "number",
            "required": true,
            "type": "integer",
            "format": "int32",
            "options": []
          }
        ],
        "pathParam": "id"
      },
      {
        "name": "setAsDefault1",
        "label": "设置为默认线路",
        "queryParams": [],
        "pathParam": "id"
      }
    ],
    "hasList": true,
    "hasDetail": true,
    "hasSave": true,
    "hasDelete": true
  },
  "datasource": {
    "key": "datasource",
    "label": "数据源管理",
    "route": "/datasource",
    "itemType": "AdminUserDatasourceResponse",
    "listParamsType": "DatasourceListParams",
    "saveType": "AdminDatasourceReVectorizeRequest",
    "tableFields": [
      {
        "name": "lastLoginTime",
        "label": "最近登录时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "nickname",
        "label": "用户昵称",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "registerTime",
        "label": "注册时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "teamId",
        "label": "团队ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "teamName",
        "label": "团队名称",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "tokenBalance",
        "label": "Token余额",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "usedTokens",
        "label": "已使用Token",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      }
    ],
    "detailFields": [
      {
        "name": "teamName",
        "label": "团队名称",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "teamId",
        "label": "团队ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "userEmail",
        "label": "用户账号（邮箱）",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "userId",
        "label": "用户ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "nickname",
        "label": "用户昵称",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "registerTime",
        "label": "注册时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "lastLoginTime",
        "label": "最近登录时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "tokenBalance",
        "label": "Token余额",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "usedTokens",
        "label": "已使用Token",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      }
    ],
    "formFields": [
      {
        "name": "items",
        "label": "数据源条目列表",
        "kind": "text",
        "required": true,
        "type": "array",
        "format": "",
        "options": []
      },
      {
        "name": "targetKbProviderType",
        "label": "目标知识库提供商类型：local/dify/aliyun/volcano/xai",
        "kind": "text",
        "required": true,
        "type": "string",
        "format": "",
        "options": []
      }
    ],
    "filters": [
      {
        "name": "userId",
        "label": "用户ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "teamId",
        "label": "团队ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "keyword",
        "label": "关键词（用户邮箱/昵称/团队名称）",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "sourceType",
        "label": "数据源类型：url/file",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "vectorStatus",
        "label": "向量化状态：0-未处理，1-处理中，2-已完成，3-失败",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "kbProviderType",
        "label": "知识库提供者类型：local/dify/aliyun/volcano",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      }
    ],
    "actions": [],
    "hasList": true,
    "hasDetail": false,
    "hasSave": true,
    "hasDelete": false
  },
  "login-fail": {
    "key": "login-fail",
    "label": "用户登录失败管理",
    "route": "/login-fail",
    "itemType": "LoginFail",
    "listParamsType": "LoginFailListParams",
    "saveType": null,
    "tableFields": [
      {
        "name": "id",
        "label": "id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "email",
        "label": "email",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "createTime",
        "label": "create Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "updateTime",
        "label": "update Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "lockBeginTime",
        "label": "lock Begin Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "lockEndTime",
        "label": "lock End Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "lockFlag",
        "label": "lock Flag",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      }
    ],
    "detailFields": [
      {
        "name": "id",
        "label": "id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "userId",
        "label": "user Id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "email",
        "label": "email",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "loginFailCount",
        "label": "login Fail Count",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "lockFlag",
        "label": "lock Flag",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "lockBeginTime",
        "label": "lock Begin Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "lockEndTime",
        "label": "lock End Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "createTime",
        "label": "create Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "updateTime",
        "label": "update Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "locked",
        "label": "locked",
        "kind": "switch",
        "required": false,
        "type": "boolean",
        "format": "",
        "options": []
      }
    ],
    "formFields": [],
    "filters": [
      {
        "name": "email",
        "label": "登录账号（邮箱）",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "lockFlag",
        "label": "锁定状态：0-未锁定，1-已锁定",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      }
    ],
    "actions": [
      {
        "name": "unlockById",
        "label": "根据ID解锁账号",
        "queryParams": [],
        "pathParam": "id"
      }
    ],
    "hasList": true,
    "hasDetail": false,
    "hasSave": false,
    "hasDelete": false
  },
  "login-log-page": {
    "key": "login-log-page",
    "label": "登录日志",
    "route": "/login-log-page",
    "itemType": "LoginLog",
    "listParamsType": "LoginLogPageListParams",
    "saveType": null,
    "tableFields": [
      {
        "name": "id",
        "label": "id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "email",
        "label": "email",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "createTime",
        "label": "create Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "updateTime",
        "label": "update Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "loginDevice",
        "label": "login Device",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "loginIp",
        "label": "login Ip",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "loginIpRegion",
        "label": "login Ip Region",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      }
    ],
    "detailFields": [
      {
        "name": "id",
        "label": "id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "userId",
        "label": "user Id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "email",
        "label": "email",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "loginIp",
        "label": "login Ip",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "loginIpRegion",
        "label": "login Ip Region",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "userAgent",
        "label": "user Agent",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "loginDevice",
        "label": "login Device",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "loginType",
        "label": "login Type",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "loginResult",
        "label": "login Result",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "remark",
        "label": "remark",
        "kind": "textarea",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "createTime",
        "label": "create Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "updateTime",
        "label": "update Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      }
    ],
    "formFields": [],
    "filters": [
      {
        "name": "userId",
        "label": "用户ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "email",
        "label": "登录账号（邮箱）",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "keyword",
        "label": "关键词（IP地址/IP地区）",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "loginType",
        "label": "登录方式：password-密码登录，email-邮箱验证码登录，google-Google登录",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "loginResult",
        "label": "登录结果：0-成功，1-失败，2-退出",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "beginTime",
        "label": "开始时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "endTime",
        "label": "结束时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      }
    ],
    "actions": [],
    "hasList": true,
    "hasDetail": false,
    "hasSave": false,
    "hasDelete": false
  },
  "membership-order": {
    "key": "membership-order",
    "label": "会员订单管理",
    "route": "/membership-order",
    "itemType": "MembershipOrder",
    "listParamsType": "MembershipOrderListParams",
    "saveType": null,
    "tableFields": [
      {
        "name": "id",
        "label": "id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "status",
        "label": "status",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "createTime",
        "label": "create Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "updateTime",
        "label": "update Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "actualPrice",
        "label": "actual Price",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "currency",
        "label": "currency",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "deleted",
        "label": "deleted",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      }
    ],
    "detailFields": [
      {
        "name": "id",
        "label": "id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "createTime",
        "label": "create Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "updateTime",
        "label": "update Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "deleted",
        "label": "deleted",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "orderNo",
        "label": "order No",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "teamId",
        "label": "team Id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "userId",
        "label": "user Id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "planId",
        "label": "plan Id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "planLevel",
        "label": "plan Level",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "planName",
        "label": "plan Name",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "subscriptionType",
        "label": "subscription Type",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "originalPrice",
        "label": "original Price",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "discountRate",
        "label": "discount Rate",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "actualPrice",
        "label": "actual Price",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "currency",
        "label": "currency",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "tokensAmount",
        "label": "tokens Amount",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      }
    ],
    "formFields": [],
    "filters": [
      {
        "name": "orderNo",
        "label": "订单号",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "teamId",
        "label": "团队ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "userId",
        "label": "用户ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "status",
        "label": "订单状态",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "paymentStatus",
        "label": "支付状态",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "paymentMethod",
        "label": "支付方式",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      }
    ],
    "actions": [
      {
        "name": "processOrderSuccess1",
        "label": "手动处理订单为支付成功",
        "queryParams": [],
        "pathParam": "orderNo"
      }
    ],
    "hasList": true,
    "hasDetail": true,
    "hasSave": false,
    "hasDelete": false
  },
  "membership-plan": {
    "key": "membership-plan",
    "label": "会员套餐管理",
    "route": "/membership-plan",
    "itemType": "MembershipPlan",
    "listParamsType": "MembershipPlanListParams",
    "saveType": "MembershipPlanSaveRequest",
    "tableFields": [
      {
        "name": "id",
        "label": "id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "name",
        "label": "name",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "createTime",
        "label": "create Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "updateTime",
        "label": "update Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "actualMonthlyPrice",
        "label": "actual Monthly Price",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "actualYearlyPrice",
        "label": "actual Yearly Price",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "deleted",
        "label": "deleted",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      }
    ],
    "detailFields": [
      {
        "name": "id",
        "label": "id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "createTime",
        "label": "create Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "updateTime",
        "label": "update Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "deleted",
        "label": "deleted",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "level",
        "label": "level",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "isFree",
        "label": "is Free",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "name",
        "label": "name",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "description",
        "label": "description",
        "kind": "textarea",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "monthlyPrice",
        "label": "monthly Price",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "yearlyPrice",
        "label": "yearly Price",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "monthlyDiscount",
        "label": "monthly Discount",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "monthlyDiscountStart",
        "label": "monthly Discount Start",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "monthlyDiscountEnd",
        "label": "monthly Discount End",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "yearlyDiscount",
        "label": "yearly Discount",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "yearlyDiscountStart",
        "label": "yearly Discount Start",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "yearlyDiscountEnd",
        "label": "yearly Discount End",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      }
    ],
    "formFields": [
      {
        "name": "level",
        "label": "会员等级：0-免费版，1-基础版，2-专业版，3-企业版，4-旗舰版",
        "kind": "number",
        "required": true,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "isFree",
        "label": "是否免费套餐：0-否，1-是",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "name",
        "label": "套餐名称",
        "kind": "text",
        "required": true,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "description",
        "label": "套餐描述",
        "kind": "textarea",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "monthlyPrice",
        "label": "月费价格",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "yearlyPrice",
        "label": "年费价格",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "monthlyDiscount",
        "label": "月费折扣(0.01-1.00)",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "monthlyDiscountStart",
        "label": "月费折扣开始时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "monthlyDiscountEnd",
        "label": "月费折扣结束时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "yearlyDiscount",
        "label": "年费折扣(0.01-1.00)",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "yearlyDiscountStart",
        "label": "年费折扣开始时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "yearlyDiscountEnd",
        "label": "年费折扣结束时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "tokens",
        "label": "包含的Tokens数量",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "maxTeamMembers",
        "label": "最大团队人数",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "features",
        "label": "功能列表（JSON格式）",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "enabled",
        "label": "是否启用：0-禁用，1-启用",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "sort",
        "label": "排序",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      }
    ],
    "filters": [],
    "actions": [
      {
        "name": "toggleEnabled3",
        "label": "启用/禁用会员套餐",
        "queryParams": [
          {
            "name": "enabled",
            "label": "enabled",
            "kind": "number",
            "required": true,
            "type": "integer",
            "format": "int32",
            "options": []
          }
        ],
        "pathParam": "id"
      }
    ],
    "hasList": true,
    "hasDetail": true,
    "hasSave": true,
    "hasDelete": true
  },
  "reminder-notification-page": {
    "key": "reminder-notification-page",
    "label": "提醒通知管理",
    "route": "/reminder-notification-page",
    "itemType": "AdminReminderNotificationResponse",
    "listParamsType": "ReminderNotificationPageListParams",
    "saveType": null,
    "tableFields": [
      {
        "name": "teamId",
        "label": "团队ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "teamName",
        "label": "团队名称",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "teamNotificationCount",
        "label": "该团队下的通知总数",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      }
    ],
    "detailFields": [
      {
        "name": "teamId",
        "label": "团队ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "teamName",
        "label": "团队名称",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "teamNotificationCount",
        "label": "该团队下的通知总数",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      }
    ],
    "formFields": [],
    "filters": [
      {
        "name": "teamId",
        "label": "团队ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "userId",
        "label": "用户ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "status",
        "label": "通知状态：draft-草稿，pending-即将到来，sent-已通知",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "isRead",
        "label": "是否已读：0-未读，1-已读",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "keyword",
        "label": "关键词（通知标题/内容）",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "startTime",
        "label": "创建开始时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "endTime",
        "label": "创建结束时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      }
    ],
    "actions": [],
    "hasList": true,
    "hasDetail": false,
    "hasSave": false,
    "hasDelete": false
  },
  "shortcut-reply-page": {
    "key": "shortcut-reply-page",
    "label": "快捷回复管理",
    "route": "/shortcut-reply-page",
    "itemType": "AdminShortcutReplyResponse",
    "listParamsType": "ShortcutReplyPageListParams",
    "saveType": null,
    "tableFields": [
      {
        "name": "teamId",
        "label": "团队ID，个人版时为null",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "teamName",
        "label": "团队名称，个人版时为'个人版'",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "teamReplyCount",
        "label": "该团队/用户下的快捷回复总数",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      }
    ],
    "detailFields": [
      {
        "name": "teamId",
        "label": "团队ID，个人版时为null",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "teamName",
        "label": "团队名称，个人版时为'个人版'",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "teamReplyCount",
        "label": "该团队/用户下的快捷回复总数",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      }
    ],
    "formFields": [],
    "filters": [
      {
        "name": "teamId",
        "label": "团队ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "userId",
        "label": "用户ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "replyScope",
        "label": "回复范围：team-团队版，personal-个人版",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "keyword",
        "label": "关键词（标题/内容）",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "startTime",
        "label": "创建开始时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "endTime",
        "label": "创建结束时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      }
    ],
    "actions": [],
    "hasList": true,
    "hasDetail": false,
    "hasSave": false,
    "hasDelete": false
  },
  "system-config": {
    "key": "system-config",
    "label": "系统配置管理",
    "route": "/system-config",
    "itemType": "SystemConfig",
    "listParamsType": "SystemConfigListParams",
    "saveType": "SystemConfigSaveRequest",
    "tableFields": [
      {
        "name": "id",
        "label": "id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "createTime",
        "label": "create Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "updateTime",
        "label": "update Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "configDesc",
        "label": "config Desc",
        "kind": "textarea",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "configGroup",
        "label": "config Group",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "configKey",
        "label": "config Key",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "configName",
        "label": "config Name",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      }
    ],
    "detailFields": [
      {
        "name": "id",
        "label": "id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "configKey",
        "label": "config Key",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "configValue",
        "label": "config Value",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "configName",
        "label": "config Name",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "configDesc",
        "label": "config Desc",
        "kind": "textarea",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "configType",
        "label": "config Type",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "configGroup",
        "label": "config Group",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "sortOrder",
        "label": "sort Order",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "isSystem",
        "label": "is System",
        "kind": "switch",
        "required": false,
        "type": "boolean",
        "format": "",
        "options": []
      },
      {
        "name": "isEncrypted",
        "label": "is Encrypted",
        "kind": "switch",
        "required": false,
        "type": "boolean",
        "format": "",
        "options": []
      },
      {
        "name": "createTime",
        "label": "create Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "updateTime",
        "label": "update Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "deleted",
        "label": "deleted",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      }
    ],
    "formFields": [
      {
        "name": "configKey",
        "label": "配置键",
        "kind": "text",
        "required": true,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "configValue",
        "label": "配置值",
        "kind": "text",
        "required": true,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "configName",
        "label": "配置名称",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "configDesc",
        "label": "配置描述",
        "kind": "textarea",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "configType",
        "label": "配置值类型：STRING, INTEGER, LONG, DOUBLE, BOOLEAN, JSON",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "configGroup",
        "label": "配置分组",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "sortOrder",
        "label": "排序序号",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      }
    ],
    "filters": [],
    "actions": [],
    "hasList": true,
    "hasDetail": true,
    "hasSave": true,
    "hasDelete": true
  },
  "team": {
    "key": "team",
    "label": "团队管理",
    "route": "/team",
    "itemType": "AdminTeamResponse",
    "listParamsType": "TeamListParams",
    "saveType": null,
    "tableFields": [
      {
        "name": "id",
        "label": "团队ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "name",
        "label": "团队名称",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "status",
        "label": "团队状态：0-禁用，1-正常",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "createTime",
        "label": "创建时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "currentMembers",
        "label": "当前成员数",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "description",
        "label": "团队描述",
        "kind": "textarea",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "logo",
        "label": "团队Logo URL",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      }
    ],
    "detailFields": [
      {
        "name": "id",
        "label": "团队ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "name",
        "label": "团队名称",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "description",
        "label": "团队描述",
        "kind": "textarea",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "logo",
        "label": "团队Logo URL",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "ownerId",
        "label": "团队所有者用户ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "ownerEmail",
        "label": "团队所有者邮箱",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "status",
        "label": "团队状态：0-禁用，1-正常",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "maxMembers",
        "label": "最大成员数",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "currentMembers",
        "label": "当前成员数",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "createTime",
        "label": "创建时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "tokenBalance",
        "label": "Token余额（剩余可用）",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "usedTokens",
        "label": "已使用Token总量",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "totalTokens",
        "label": "总获得Token数量",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      }
    ],
    "formFields": [],
    "filters": [
      {
        "name": "keyword",
        "label": "关键词（团队名称）",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "status",
        "label": "团队状态：0-禁用，1-正常",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      }
    ],
    "actions": [
      {
        "name": "updateStatus1",
        "label": "修改团队状态",
        "queryParams": [
          {
            "name": "status",
            "label": "status",
            "kind": "number",
            "required": true,
            "type": "integer",
            "format": "int32",
            "options": []
          }
        ],
        "pathParam": "id"
      }
    ],
    "hasList": true,
    "hasDetail": true,
    "hasSave": false,
    "hasDelete": false
  },
  "token-alert-config": {
    "key": "token-alert-config",
    "label": "Token异常监测配置管理",
    "route": "/token-alert-config",
    "itemType": "TokenAlertConfig",
    "listParamsType": "TokenAlertConfigListParams",
    "saveType": "AdminTokenAlertConfigSaveRequest",
    "tableFields": [
      {
        "name": "id",
        "label": "id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "createTime",
        "label": "create Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "updateTime",
        "label": "update Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "alertEmail",
        "label": "alert Email",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "alertIntervalMinutes",
        "label": "alert Interval Minutes",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "alertName",
        "label": "alert Name",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "deleted",
        "label": "deleted",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      }
    ],
    "detailFields": [
      {
        "name": "id",
        "label": "id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "createTime",
        "label": "create Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "updateTime",
        "label": "update Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "deleted",
        "label": "deleted",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "teamId",
        "label": "team Id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "userId",
        "label": "user Id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "alertName",
        "label": "alert Name",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "timeWindowType",
        "label": "time Window Type",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "timeWindowValue",
        "label": "time Window Value",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "threshold",
        "label": "threshold",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "alertEmail",
        "label": "alert Email",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "isEnabled",
        "label": "is Enabled",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "lastAlertTime",
        "label": "last Alert Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "alertIntervalMinutes",
        "label": "alert Interval Minutes",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      }
    ],
    "formFields": [
      {
        "name": "teamId",
        "label": "团队ID（0表示全局配置）",
        "kind": "number",
        "required": true,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "userId",
        "label": "用户ID（null表示团队级别监测）",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "alertName",
        "label": "监测规则名称",
        "kind": "text",
        "required": true,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "timeWindowType",
        "label": "时间窗口类型：hour-小时，day-天",
        "kind": "text",
        "required": true,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "timeWindowValue",
        "label": "时间窗口值（如1、24、7等）",
        "kind": "number",
        "required": true,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "threshold",
        "label": "Token阈值",
        "kind": "number",
        "required": true,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "alertEmail",
        "label": "告警邮箱（null则使用平台邮箱）",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "isEnabled",
        "label": "是否启用：0-禁用，1-启用",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "alertIntervalMinutes",
        "label": "告警间隔（分钟），防止频繁发送",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      }
    ],
    "filters": [
      {
        "name": "teamId",
        "label": "团队ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "userId",
        "label": "用户ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "isEnabled",
        "label": "是否启用：0-禁用，1-启用",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      }
    ],
    "actions": [
      {
        "name": "toggleEnabled2",
        "label": "启用/禁用Token监测配置",
        "queryParams": [
          {
            "name": "isEnabled",
            "label": "is Enabled",
            "kind": "number",
            "required": true,
            "type": "integer",
            "format": "int32",
            "options": []
          }
        ],
        "pathParam": "id"
      }
    ],
    "hasList": true,
    "hasDetail": true,
    "hasSave": true,
    "hasDelete": true
  },
  "token-alert-record-page": {
    "key": "token-alert-record-page",
    "label": "Token异常监测记录",
    "route": "/token-alert-record-page",
    "itemType": "TokenAlertRecord",
    "listParamsType": "TokenAlertRecordPageListParams",
    "saveType": null,
    "tableFields": [
      {
        "name": "id",
        "label": "id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "createTime",
        "label": "create Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "updateTime",
        "label": "update Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "actualConsumption",
        "label": "actual Consumption",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "alertConfigId",
        "label": "alert Config Id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "alertEmail",
        "label": "alert Email",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "alertMessage",
        "label": "alert Message",
        "kind": "textarea",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      }
    ],
    "detailFields": [
      {
        "name": "id",
        "label": "id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "createTime",
        "label": "create Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "updateTime",
        "label": "update Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "deleted",
        "label": "deleted",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "alertConfigId",
        "label": "alert Config Id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "teamId",
        "label": "team Id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "userId",
        "label": "user Id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "timeWindowType",
        "label": "time Window Type",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "timeWindowValue",
        "label": "time Window Value",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "threshold",
        "label": "threshold",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "actualConsumption",
        "label": "actual Consumption",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "startTime",
        "label": "start Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "endTime",
        "label": "end Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "alertEmail",
        "label": "alert Email",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "alertStatus",
        "label": "alert Status",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "alertMessage",
        "label": "alert Message",
        "kind": "textarea",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      }
    ],
    "formFields": [],
    "filters": [
      {
        "name": "alertConfigId",
        "label": "监测配置ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "teamId",
        "label": "团队ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "userId",
        "label": "用户ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "alertStatus",
        "label": "告警状态：sent-已发送，failed-发送失败",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "startTime",
        "label": "开始时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "endTime",
        "label": "结束时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      }
    ],
    "actions": [],
    "hasList": true,
    "hasDetail": false,
    "hasSave": false,
    "hasDelete": false
  },
  "token-package": {
    "key": "token-package",
    "label": "Token价格套餐管理",
    "route": "/token-package",
    "itemType": "TokenPricePackage",
    "listParamsType": "TokenPackageListParams",
    "saveType": "TokenPricePackageSaveRequest",
    "tableFields": [
      {
        "name": "id",
        "label": "id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "createTime",
        "label": "create Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "updateTime",
        "label": "update Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "cnyActualPrice",
        "label": "cny Actual Price",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "cnyDiscountRate",
        "label": "cny Discount Rate",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "cnyOriginalPrice",
        "label": "cny Original Price",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "deleted",
        "label": "deleted",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      }
    ],
    "detailFields": [
      {
        "name": "id",
        "label": "id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "createTime",
        "label": "create Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "updateTime",
        "label": "update Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "deleted",
        "label": "deleted",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "tokensAmount",
        "label": "tokens Amount",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "packageName",
        "label": "package Name",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "description",
        "label": "description",
        "kind": "textarea",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "usdOriginalPrice",
        "label": "usd Original Price",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "usdDiscountRate",
        "label": "usd Discount Rate",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "usdActualPrice",
        "label": "usd Actual Price",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "cnyOriginalPrice",
        "label": "cny Original Price",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "cnyDiscountRate",
        "label": "cny Discount Rate",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "cnyActualPrice",
        "label": "cny Actual Price",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "eurOriginalPrice",
        "label": "eur Original Price",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "eurDiscountRate",
        "label": "eur Discount Rate",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "eurActualPrice",
        "label": "eur Actual Price",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      }
    ],
    "formFields": [
      {
        "name": "tokensAmount",
        "label": "Token数量",
        "kind": "number",
        "required": true,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "packageName",
        "label": "套餐名称",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "description",
        "label": "套餐描述",
        "kind": "textarea",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "usdOriginalPrice",
        "label": "USD原价",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "usdDiscountRate",
        "label": "USD折扣率",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "usdActualPrice",
        "label": "USD实际价格",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "cnyOriginalPrice",
        "label": "CNY原价",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "cnyDiscountRate",
        "label": "CNY折扣率",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "cnyActualPrice",
        "label": "CNY实际价格",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "eurOriginalPrice",
        "label": "EUR原价",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "eurDiscountRate",
        "label": "EUR折扣率",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "eurActualPrice",
        "label": "EUR实际价格",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "processingFeeConfig",
        "label": "手续费配置JSON",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "enabled",
        "label": "是否启用：0-禁用，1-启用",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "sortOrder",
        "label": "排序序号",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "promotionTag",
        "label": "促销标签",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "promotionStartTime",
        "label": "促销开始时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "promotionEndTime",
        "label": "促销结束时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "isRecommended",
        "label": "是否推荐：0-否，1-是",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      }
    ],
    "filters": [],
    "actions": [
      {
        "name": "toggleEnabled1",
        "label": "启用/禁用Token套餐",
        "queryParams": [
          {
            "name": "enabled",
            "label": "enabled",
            "kind": "number",
            "required": true,
            "type": "integer",
            "format": "int32",
            "options": []
          }
        ],
        "pathParam": "id"
      }
    ],
    "hasList": true,
    "hasDetail": true,
    "hasSave": true,
    "hasDelete": true
  },
  "token-recharge-order": {
    "key": "token-recharge-order",
    "label": "Token充值订单管理",
    "route": "/token-recharge-order",
    "itemType": "TokenRechargeOrder",
    "listParamsType": "TokenRechargeOrderListParams",
    "saveType": null,
    "tableFields": [
      {
        "name": "id",
        "label": "id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "status",
        "label": "status",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "createTime",
        "label": "create Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "updateTime",
        "label": "update Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "actualPrice",
        "label": "actual Price",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "currency",
        "label": "currency",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "deleted",
        "label": "deleted",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      }
    ],
    "detailFields": [
      {
        "name": "id",
        "label": "id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "createTime",
        "label": "create Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "updateTime",
        "label": "update Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "deleted",
        "label": "deleted",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "orderNo",
        "label": "order No",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "teamId",
        "label": "team Id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "userId",
        "label": "user Id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "tokensAmount",
        "label": "tokens Amount",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "originalPrice",
        "label": "original Price",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "discountRate",
        "label": "discount Rate",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "actualPrice",
        "label": "actual Price",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "currency",
        "label": "currency",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "paymentMethod",
        "label": "payment Method",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "paymentOrderId",
        "label": "payment Order Id",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "paymentUrl",
        "label": "payment Url",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "paymentStatus",
        "label": "payment Status",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      }
    ],
    "formFields": [],
    "filters": [
      {
        "name": "orderNo",
        "label": "订单号",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "teamId",
        "label": "团队ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "userId",
        "label": "用户ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "status",
        "label": "订单状态",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "paymentStatus",
        "label": "支付状态",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "paymentMethod",
        "label": "支付方式",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      }
    ],
    "actions": [
      {
        "name": "processOrderSuccess",
        "label": "手动处理订单为支付成功",
        "queryParams": [],
        "pathParam": "orderNo"
      }
    ],
    "hasList": true,
    "hasDetail": true,
    "hasSave": false,
    "hasDelete": false
  },
  "translate-route": {
    "key": "translate-route",
    "label": "翻译线路配置管理",
    "route": "/translate-route",
    "itemType": "TranslateRoute",
    "listParamsType": "TranslateRouteListParams",
    "saveType": "AdminTranslateRouteSaveRequest",
    "tableFields": [
      {
        "name": "id",
        "label": "id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "createTime",
        "label": "create Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "updateTime",
        "label": "update Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "aiRoute",
        "label": "ai Route",
        "kind": "switch",
        "required": false,
        "type": "boolean",
        "format": "",
        "options": []
      },
      {
        "name": "apiKeyConfig",
        "label": "api Key Config",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "apiUrl",
        "label": "api Url",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "basicRoute",
        "label": "basic Route",
        "kind": "switch",
        "required": false,
        "type": "boolean",
        "format": "",
        "options": []
      }
    ],
    "detailFields": [
      {
        "name": "id",
        "label": "id",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "createTime",
        "label": "create Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "updateTime",
        "label": "update Time",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "deleted",
        "label": "deleted",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "routeCode",
        "label": "route Code",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "routeName",
        "label": "route Name",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "routeType",
        "label": "route Type",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "provider",
        "label": "provider",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "modelId",
        "label": "model Id",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "modelCode",
        "label": "model Code",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "apiUrl",
        "label": "api Url",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "apiKeyConfig",
        "label": "api Key Config",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "icon",
        "label": "icon",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "description",
        "label": "description",
        "kind": "textarea",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "supportedLangs",
        "label": "supported Langs",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "tokensPerChar",
        "label": "tokens Per Char",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      }
    ],
    "formFields": [
      {
        "name": "routeCode",
        "label": "线路编码（唯一标识）",
        "kind": "text",
        "required": true,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "routeName",
        "label": "线路名称",
        "kind": "text",
        "required": true,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "routeType",
        "label": "线路类型：ai-AI智能翻译，basic-基础翻译引擎",
        "kind": "text",
        "required": true,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "provider",
        "label": "提供商：openai/aliyun/google/tencent/microsoft等",
        "kind": "text",
        "required": true,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "modelCode",
        "label": "AI模型代码（AI智能翻译时使用，如qwen-mt-flash）",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "apiUrl",
        "label": "API地址",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "apiKeyConfig",
        "label": "API密钥配置Key（指向系统配置）",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "icon",
        "label": "图标URL",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "description",
        "label": "线路描述",
        "kind": "textarea",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "supportedLangs",
        "label": "支持的语言列表（JSON数组）",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "tokensPerChar",
        "label": "每字符消耗tokens数（基础翻译引擎用）",
        "kind": "number",
        "required": false,
        "type": "number",
        "format": "",
        "options": []
      },
      {
        "name": "isAi",
        "label": "是否AI翻译：0-否，1-是",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "isDefault",
        "label": "是否默认线路：0-否，1-是",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "isEnabled",
        "label": "是否启用：0-禁用，1-启用",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "sortOrder",
        "label": "排序序号",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      }
    ],
    "filters": [],
    "actions": [
      {
        "name": "toggleEnabled",
        "label": "启用/禁用翻译线路",
        "queryParams": [
          {
            "name": "isEnabled",
            "label": "is Enabled",
            "kind": "number",
            "required": true,
            "type": "integer",
            "format": "int32",
            "options": []
          }
        ],
        "pathParam": "id"
      },
      {
        "name": "setAsDefault",
        "label": "设置为默认翻译线路",
        "queryParams": [],
        "pathParam": "id"
      }
    ],
    "hasList": true,
    "hasDetail": true,
    "hasSave": true,
    "hasDelete": true
  },
  "user": {
    "key": "user",
    "label": "用户管理",
    "route": "/user",
    "itemType": "AdminUserResponse",
    "listParamsType": "UserListParams",
    "saveType": null,
    "tableFields": [
      {
        "name": "id",
        "label": "用户ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "email",
        "label": "邮箱",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "status",
        "label": "用户状态：0-禁用，1-正常",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "createTime",
        "label": "创建时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "avatar",
        "label": "头像URL",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "currentTeamId",
        "label": "当前所属团队ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "emailVerified",
        "label": "邮箱是否验证：0-未验证，1-已验证",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      }
    ],
    "detailFields": [
      {
        "name": "id",
        "label": "用户ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "email",
        "label": "邮箱",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "nickname",
        "label": "昵称",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "avatar",
        "label": "头像URL",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "phone",
        "label": "手机号",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "status",
        "label": "用户状态：0-禁用，1-正常",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "emailVerified",
        "label": "邮箱是否验证：0-未验证，1-已验证",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "googleAuthBound",
        "label": "是否绑定谷歌验证",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "currentTeamId",
        "label": "当前所属团队ID",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int64",
        "options": []
      },
      {
        "name": "membershipLevel",
        "label": "当前会员等级",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "lastLoginTime",
        "label": "最后登录时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      },
      {
        "name": "lastLoginIp",
        "label": "最后登录IP",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "registerSource",
        "label": "注册来源",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "remark",
        "label": "备注",
        "kind": "textarea",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "createTime",
        "label": "创建时间",
        "kind": "datetime",
        "required": false,
        "type": "string",
        "format": "date-time",
        "options": []
      }
    ],
    "formFields": [],
    "filters": [
      {
        "name": "keyword",
        "label": "关键词（邮箱/昵称）",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      },
      {
        "name": "status",
        "label": "用户状态：0-禁用，1-正常",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "membershipLevel",
        "label": "会员等级：0-免费版，1-基础版，2-专业版，3-企业版，4-旗舰版",
        "kind": "number",
        "required": false,
        "type": "integer",
        "format": "int32",
        "options": []
      },
      {
        "name": "registerSource",
        "label": "注册来源：self-自主注册，invite-邀请注册",
        "kind": "text",
        "required": false,
        "type": "string",
        "format": "",
        "options": []
      }
    ],
    "actions": [
      {
        "name": "updateStatus",
        "label": "修改用户状态",
        "queryParams": [
          {
            "name": "status",
            "label": "status",
            "kind": "number",
            "required": true,
            "type": "integer",
            "format": "int32",
            "options": []
          }
        ],
        "pathParam": "id"
      },
      {
        "name": "resetPassword",
        "label": "重置用户密码",
        "queryParams": [
          {
            "name": "newPassword",
            "label": "new Password",
            "kind": "text",
            "required": true,
            "type": "string",
            "format": "",
            "options": []
          }
        ],
        "pathParam": "id"
      }
    ],
    "hasList": true,
    "hasDetail": true,
    "hasSave": false,
    "hasDelete": false
  },
};

export const sidebarItems: SidebarItem[] = [
  {
    "label": "仪表盘",
    "path": "/dashboard"
  },
  {
    "label": "管理员用户管理",
    "path": "/admin-user"
  },
  {
    "label": "应用版本管理",
    "path": "/app-version"
  },
  {
    "label": "自动回复规则管理",
    "path": "/auto-reply-rule-page"
  },
  {
    "label": "广播消息管理",
    "path": "/broadcast-message"
  },
  {
    "label": "AI聊天机器人对话日志",
    "path": "/chatbot-chat-log-page"
  },
  {
    "label": "AI聊天机器人预览对话",
    "path": "/chatbot-preview-chat-page"
  },
  {
    "label": "AI聊天机器人线路配置管理",
    "path": "/chatbot-route"
  },
  {
    "label": "数据源管理",
    "path": "/datasource"
  },
  {
    "label": "用户登录失败管理",
    "path": "/login-fail"
  },
  {
    "label": "登录日志",
    "path": "/login-log-page"
  },
  {
    "label": "会员订单管理",
    "path": "/membership-order"
  },
  {
    "label": "会员套餐管理",
    "path": "/membership-plan"
  },
  {
    "label": "提醒通知管理",
    "path": "/reminder-notification-page"
  },
  {
    "label": "快捷回复管理",
    "path": "/shortcut-reply-page"
  },
  {
    "label": "系统配置管理",
    "path": "/system-config"
  },
  {
    "label": "团队管理",
    "path": "/team"
  },
  {
    "label": "Token异常监测配置管理",
    "path": "/token-alert-config"
  },
  {
    "label": "Token异常监测记录",
    "path": "/token-alert-record-page"
  },
  {
    "label": "Token价格套餐管理",
    "path": "/token-package"
  },
  {
    "label": "Token充值订单管理",
    "path": "/token-recharge-order"
  },
  {
    "label": "翻译线路配置管理",
    "path": "/translate-route"
  },
  {
    "label": "用户管理",
    "path": "/user"
  }
];

function resolveSidebarGroup(item: SidebarItem) {
  const path = item.path;
  if (path === '/dashboard') return '总览';
  if (['/admin-user', '/login-fail', '/login-log-page'].includes(path)) return '权限与安全';
  if (['/user', '/team'].includes(path)) return '用户与团队';
  if (['/auto-reply-rule-page', '/broadcast-message', '/reminder-notification-page', '/shortcut-reply-page'].includes(path)) {
    return '消息与内容';
  }
  if (['/chatbot-chat-log-page', '/chatbot-preview-chat-page', '/chatbot-route', '/datasource', '/translate-route'].includes(path)) {
    return 'AI 与知识库';
  }
  if (['/membership-order', '/membership-plan', '/token-package', '/token-recharge-order'].includes(path)) {
    return '订单与会员';
  }
  if (['/token-alert-config', '/token-alert-record-page'].includes(path)) return '监控与告警';
  return '系统配置';
}

const sidebarGroupOrder = ['总览', '权限与安全', '用户与团队', 'AI 与知识库', '消息与内容', '订单与会员', '监控与告警', '系统配置'];

export const sidebarGroups: SidebarGroup[] = sidebarGroupOrder
  .map((title) => ({
    title,
    items: sidebarItems.filter((item) => resolveSidebarGroup(item) === title),
  }))
  .filter((group) => group.items.length > 0);

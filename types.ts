export enum View {
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
  DASHBOARD = 'DASHBOARD',
  PRICING = 'PRICING',
  SETTINGS = 'SETTINGS',
  CREDITS = 'CREDITS',
}

export enum ToolType {
  TXT_IMG_TO_IMG = 'TXT_IMG_TO_IMG',
  TXT_IMG_EDIT = 'TXT_IMG_EDIT',
  IMG_TO_VIDEO = 'IMG_TO_VIDEO',
  VIDEO_FRAME_EXTRACT = 'VIDEO_FRAME_EXTRACT',
  VIDEO_THUMBNAILS = 'VIDEO_THUMBNAILS',
  TXT_TO_AUDIO = 'TXT_TO_AUDIO',
  AUDIO_TO_TXT = 'AUDIO_TO_TXT',
  PDF_TO_WORD = 'PDF_TO_WORD',
  WORD_TO_PDF = 'WORD_TO_PDF',
  PDF_EDIT = 'PDF_EDIT',
  WORD_EDIT = 'WORD_EDIT',
  ICON_GEN = 'ICON_GEN',
  IMG_ENHANCE = 'IMG_ENHANCE',
  VIDEO_ENHANCE = 'VIDEO_ENHANCE',
}

export interface ToolDefinition {
  id: ToolType;
  title: string;
  description: string;
  icon: string; // emoji or svg path name
  cost: number;
  category: 'Image' | 'Video' | 'Audio' | 'Document' | 'Utility';
}

export interface User {
  id: string;
  email: string;
  name: string;
  credits: number;
  plan: 'Free' | 'Pro';
  apiKey?: string; // Local override
}

export interface GeneratedContent {
  type: 'text' | 'image' | 'audio' | 'video' | 'file';
  data: string; // URL or Text
  mimeType?: string;
}
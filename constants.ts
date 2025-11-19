import { ToolType, ToolDefinition } from './types';

export const TOOLS: ToolDefinition[] = [
  {
    id: ToolType.TXT_IMG_TO_IMG,
    title: "Text/Image to Image",
    description: "Generate high-quality images from text prompts or reference images.",
    icon: "🖼️",
    cost: 5,
    category: 'Image'
  },
  {
    id: ToolType.TXT_IMG_EDIT,
    title: "Text & Image to Image",
    description: "Edit or transform existing images using text instructions.",
    icon: "🎨",
    cost: 5,
    category: 'Image'
  },
  {
    id: ToolType.IMG_TO_VIDEO,
    title: "Image to Video",
    description: "Animate static images into short video clips.",
    icon: "🎬",
    cost: 20,
    category: 'Video'
  },
  {
    id: ToolType.VIDEO_FRAME_EXTRACT,
    title: "Video Best Frames",
    description: "Extract the top 5 best high-quality images from a video.",
    icon: "📸",
    cost: 10,
    category: 'Video'
  },
  {
    id: ToolType.VIDEO_THUMBNAILS,
    title: "Creative Thumbnails",
    description: "Generate catchy thumbnails for YouTube, Instagram, etc.",
    icon: "✨",
    cost: 8,
    category: 'Video'
  },
  {
    id: ToolType.TXT_TO_AUDIO,
    title: "Text to Audio",
    description: "Convert text into lifelike speech with AI voices.",
    icon: "🎙️",
    cost: 3,
    category: 'Audio'
  },
  {
    id: ToolType.AUDIO_TO_TXT,
    title: "Audio to Text",
    description: "Transcribe audio files into accurate text.",
    icon: "📝",
    cost: 3,
    category: 'Audio'
  },
  {
    id: ToolType.PDF_TO_WORD,
    title: "PDF to Word",
    description: "Convert PDF documents into editable Word files.",
    icon: "📄",
    cost: 2,
    category: 'Document'
  },
  {
    id: ToolType.WORD_TO_PDF,
    title: "Word to PDF",
    description: "Convert Word documents into professional PDFs.",
    icon: "📑",
    cost: 2,
    category: 'Document'
  },
  {
    id: ToolType.PDF_EDIT,
    title: "Editable PDF",
    description: "Make PDFs editable and download them.",
    icon: "✏️",
    cost: 4,
    category: 'Document'
  },
  {
    id: ToolType.WORD_EDIT,
    title: "Editable Word",
    description: "Edit Word documents online with AI assistance.",
    icon: "✍️",
    cost: 4,
    category: 'Document'
  },
  {
    id: ToolType.ICON_GEN,
    title: "Icon Generator",
    description: "Create app icons, logos, and flat vector styles.",
    icon: "🔷",
    cost: 5,
    category: 'Utility'
  },
  {
    id: ToolType.IMG_ENHANCE,
    title: "Image Enhancer",
    description: "Upscale and restore old or blurry photos.",
    icon: "🔍",
    cost: 5,
    category: 'Image'
  },
  {
    id: ToolType.VIDEO_ENHANCE,
    title: "Video Enhancer",
    description: "Improve video quality to HD/4K.",
    icon: "📼",
    cost: 15,
    category: 'Video'
  },
];

export const PLANS = [
  {
    name: "Free Starter",
    price: "₹0",
    credits: "50 Credits",
    features: ["Access to basic tools", "Standard speed", "Community support"]
  },
  {
    name: "Pro Creator",
    price: "₹50",
    period: "/ month",
    credits: "200 Credits",
    features: ["Access to all tools", "Priority generation", "Commercial license", "HD Exports"],
    popular: true
  }
];

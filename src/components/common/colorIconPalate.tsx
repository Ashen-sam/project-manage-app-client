import {
    // Core Actions
    Activity, AlarmClock, AlertCircle, AlertTriangle, Anchor, Apple, AtSign,
    Award, BarChart, Battery, Bell, Bookmark, Box, Briefcase, Brush, Bug,
    Calendar, Camera, Car, CheckCircle, CheckSquare, ClipboardCheck,
    ClipboardList, Clock, Cloud, CloudDownload, CloudUpload, Code, Coffee,
    Coins, Columns, Compass, Copy, Cpu, CreditCard, Database, DollarSign,
    Download, Droplet, Edit, Eye, EyeOff, Factory, FileCode, FileSpreadsheet,
    FileText, Film, Filter, Flag, Folder, FolderOpen, Frame, Gauge, Gift,
    GitBranch, GitCommit, GitMerge, Globe, GraduationCap, Grid, Hammer,
    HardDrive, HardHat, Heart, HelpCircle, Home, Info, Key, Layers, Layout,
    LayoutDashboard, Leaf, Lightbulb, LineChart, Link, List, Lock, Mail,
    Map, MapPin, MessageCircle, MessageSquare, Mic, Microscope, MinusCircle,
    Monitor, Moon, Music, Navigation, Package, Palette, PanelBottom, PanelTop,
    Pause, Pen, PenTool, Phone, PieChart, Pill, Play, PlusCircle, Receipt,
    RefreshCw, Rows, Ruler, Save, Search, Send, Server, Settings, Shapes,
    Share2, Shield, ShieldCheck, ShoppingBag, ShoppingCart, Sidebar,
    Sliders, Smartphone, Smile, SortAsc, SortDesc, Star, Stethoscope,
    StopCircle, Sun, Table, Target, Terminal, Thermometer, Timer, Trash,
    TrendingDown, TrendingUp, Truck, Type, Unlock, Upload, User, UserCheck,
    UserPlus, Users, UserX, Video, Wallet, Warehouse, Workflow, Wrench,
    XCircle, Zap, ZapOff, Figma, Gamepad, ClipboardX,
    SettingsIcon,
    Calculator
} from "lucide-react";

export const availableIcons = {
    // Core Actions
    Play, Pause, StopCircle, PlusCircle, MinusCircle, CheckCircle, XCircle,
    Edit, Trash, Save, Copy, Download, Upload, Share2, RefreshCw, Search, Filter,
    Settings: SettingsIcon, Lock, Unlock, Eye, EyeOff, Bell, Star, Bookmark,

    // Workflow & Project
    GitBranch, GitMerge, GitCommit, Layers, Link, Workflow, Calendar,
    ClipboardList, ClipboardCheck, Target, Flag, Award, Briefcase,
    FileText, Folder, FolderOpen, Package, Box, Database,

    // Communication
    Mail, MessageCircle, MessageSquare, Phone, Video, Mic, Users,
    User, UserPlus, UserCheck, UserX, Globe, Send, AtSign,

    // Progress & Status
    BarChart, PieChart, LineChart, TrendingUp, TrendingDown, Activity,
    Clock, Timer, CheckSquare, AlertTriangle, AlertCircle, Info, HelpCircle,

    // Development & Technical
    Code, Terminal, Cpu, Cloud, CloudUpload, CloudDownload, Server, Bug,
    Key, Shield, FileCode, Zap, Wrench, Hammer,
    Compass, HardDrive, Monitor, Smartphone,

    // Finance & Business
    DollarSign, CreditCard, ShoppingCart, Receipt, Wallet, Coins,
    FileSpreadsheet, Calculator,


    // Creative & Design
    Image, Music, Camera, PenTool, Palette, Type, Layout,
    Sliders, Ruler, Brush, Film, Frame, Shapes,

    // Education & Research
    GraduationCap, Lightbulb,
    Microscope, ClipboardX, Pen,

    // Health & Wellness
    Heart, Pill, Stethoscope, Thermometer, Sun, Moon, Coffee,
    Droplet, Apple, Leaf, ZapOff,

    // Logistics & Industry
    Truck, Factory, Warehouse, MapPin, Navigation,
    Map, Anchor, Gauge, Battery, HardHat, ShieldCheck,

    // Personal / Lifestyle
    AlarmClock, Smile,
    ShoppingBag, Gift, Gamepad, Home, Car,

    // Advanced UI / Data
    Table, Grid, List, Columns, Rows, SortAsc, SortDesc,
    LayoutDashboard, Sidebar, PanelBottom, PanelTop,
};
export const iconColors = [
    // Brand / Vibrant
    { name: 'Emerald', value: 'text-emerald-500' },
    { name: 'Cyan', value: 'text-cyan-500' },
    { name: 'Indigo', value: 'text-indigo-500' },
    { name: 'Amber', value: 'text-amber-500' },
    { name: 'Rose', value: 'text-rose-500' },
    { name: 'Purple', value: 'text-purple-500' },
    { name: 'Blue', value: 'text-blue-500' },
    { name: 'Green', value: 'text-green-500' },
    { name: 'Red', value: 'text-red-500' },
    { name: 'Orange', value: 'text-orange-500' },
    { name: 'Pink', value: 'text-pink-500' },
    { name: 'Teal', value: 'text-teal-500' },

    // Neutral / Professional
    { name: 'Slate', value: 'text-slate-500' },
    { name: 'Gray', value: 'text-gray-500' },
    { name: 'Zinc', value: 'text-zinc-500' },
    { name: 'Neutral', value: 'text-neutral-500' },

    // Soft / Pastel (for calm dashboards)
    { name: 'Sky', value: 'text-sky-500' },
    { name: 'Lime', value: 'text-lime-500' },
    { name: 'Fuchsia', value: 'text-fuchsia-500' },
    { name: 'Violet', value: 'text-violet-500' },

    // Darker Accents
    { name: 'Stone', value: 'text-stone-600' },
    { name: 'Slate Dark', value: 'text-slate-700' },
    { name: 'Gray Dark', value: 'text-gray-700' },
];

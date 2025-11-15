// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from '@/components/ui/select';
// import {
//     addEdge,
//     Background,
//     BackgroundVariant,
//     Controls,
//     MiniMap,
//     Panel,
//     ReactFlow,
//     useEdgesState,
//     useNodesState,
//     MarkerType,
//     Handle,
//     Position
// } from '@xyflow/react';
// import '@xyflow/react/dist/style.css';
// import {
//     Plus,
//     Trash2,
//     ChevronLeft,
//     ChevronRight,
//     Info,
//     Settings,
//     Network,
//     Play,
//     Shuffle,
//     GitBranch,
//     GitMerge,
//     CheckCircle,
//     Link2,
//     Database,
//     FileText,
//     Mail,
//     Code,
//     Box,
//     Zap,
//     Filter,
//     BarChart,
//     Users,
//     Calendar,
//     Cloud,
//     Lock,
//     Bell,
//     Upload,
//     Download,
//     Search,
//     Edit,
//     Save,
//     Trash,
//     Star,
//     Heart,
//     MessageCircle,
//     Share2,
//     Bookmark,
//     AlertCircle,
//     HelpCircle,
//     MapPin,
//     Phone,
//     Image,
//     Video,
//     Music,
//     Folder,
//     File,
//     Settings as SettingsIcon
// } from 'lucide-react';
// import { useCallback, useState } from 'react';

// // Available icons for node types
// const availableIcons = {
//     Play, Shuffle, GitBranch, GitMerge, CheckCircle, Database, FileText,
//     Mail, Code, Box, Zap, Filter, BarChart, Users, Calendar, Cloud,
//     Lock, Bell, Upload, Download, Search, Edit, Save, Trash, Star,
//     Heart, MessageCircle, Share2, Bookmark, AlertCircle, HelpCircle,
//     MapPin, Phone, Image, Video, Music, Folder, File, Settings: SettingsIcon
// };

// // Icon colors
// const iconColors = [
//     { name: 'Emerald', value: 'text-emerald-500' },
//     { name: 'Cyan', value: 'text-cyan-500' },
//     { name: 'Indigo', value: 'text-indigo-500' },
//     { name: 'Amber', value: 'text-amber-500' },
//     { name: 'Rose', value: 'text-rose-500' },
//     { name: 'Purple', value: 'text-purple-500' },
//     { name: 'Blue', value: 'text-blue-500' },
//     { name: 'Green', value: 'text-green-500' },
//     { name: 'Red', value: 'text-red-500' },
//     { name: 'Orange', value: 'text-orange-500' },
//     { name: 'Pink', value: 'text-pink-500' },
//     { name: 'Teal', value: 'text-teal-500' },
// ];

// const CustomNode = ({ data, id }) => (
//     <div className="relative group">
//         {/* Top Handle */}
//         <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
//             <Handle
//                 type="target"
//                 position={Position.Top}
//                 id="top-target"
//                 className="!w-3 !h-3 !bg-blue-500 !border-2 !border-white !rounded-full hover:!scale-125 transition-transform"
//             />
//             <Handle
//                 type="source"
//                 position={Position.Top}
//                 id="top-source"
//                 className="!w-3 !h-3 !bg-blue-500 !border-2 !border-white !rounded-full hover:!scale-125 transition-transform"
//             />
//         </div>

//         {/* Bottom Handle */}
//         <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-10">
//             <Handle
//                 type="target"
//                 position={Position.Bottom}
//                 id="bottom-target"
//                 className="!w-3 !h-3 !bg-blue-500 !border-2 !border-white !rounded-full hover:!scale-125 transition-transform"
//             />
//             <Handle
//                 type="source"
//                 position={Position.Bottom}
//                 id="bottom-source"
//                 className="!w-3 !h-3 !bg-blue-500 !border-2 !border-white !rounded-full hover:!scale-125 transition-transform"
//             />
//         </div>

//         {/* Left Handle */}
//         <div className="absolute -left-2 top-1/2 -translate-y-1/2 z-10">
//             <Handle
//                 type="target"
//                 position={Position.Left}
//                 id="left-target"
//                 className="!w-3 !h-3 !bg-blue-500 !border-2 !border-white !rounded-full hover:!scale-125 transition-transform"
//             />
//             <Handle
//                 type="source"
//                 position={Position.Left}
//                 id="left-source"
//                 className="!w-3 !h-3 !bg-blue-500 !border-2 !border-white !rounded-full hover:!scale-125 transition-transform"
//             />
//         </div>

//         {/* Right Handle */}
//         <div className="absolute -right-2 top-1/2 -translate-y-1/2 z-10">
//             <Handle
//                 type="target"
//                 position={Position.Right}
//                 id="right-target"
//                 className="!w-3 !h-3 !bg-blue-500 !border-2 !border-white !rounded-full hover:!scale-125 transition-transform"
//             />
//             <Handle
//                 type="source"
//                 position={Position.Right}
//                 id="right-source"
//                 className="!w-3 !h-3 !bg-blue-500 !border-2 !border-white !rounded-full hover:!scale-125 transition-transform"
//             />
//         </div>

//         {/* Node Content */}
//         <div className="px-6 py-3 shadow-lg rounded-lg bg-white border-2 border-blue-500 min-w-[180px] relative z-0">
//             <div className="flex items-center gap-2 mb-1">
//                 {data.icon}
//                 <div className="font-bold text-sm">{data.label}</div>
//             </div>
//             {data.description && (
//                 <div className="text-xs text-gray-600">{data.description}</div>
//             )}
//         </div>

//         {/* Connection Point Indicators - Only show on hover */}
//         <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
//             <Plus className="w-3 h-3 text-gray-400" />
//         </div>
//         <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
//             <Plus className="w-3 h-3 text-gray-400" />
//         </div>
//         <div className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
//             <Plus className="w-3 h-3 text-gray-400" />
//         </div>
//         <div className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
//             <Plus className="w-3 h-3 text-gray-400" />
//         </div>
//     </div>
// );

// const nodeTypes = {
//     custom: CustomNode,
// };

// // Default node types with customizable icons
// const defaultNodeTypes = [
//     { name: 'Initial', icon: 'Play', color: 'text-emerald-500' },
//     { name: 'Transform', icon: 'Shuffle', color: 'text-cyan-500' },
//     { name: 'Join', icon: 'GitMerge', color: 'text-indigo-500' },
//     { name: 'Branch', icon: 'GitBranch', color: 'text-amber-500' },
//     { name: 'Output', icon: 'CheckCircle', color: 'text-rose-500' },
// ];

// const initialNodes = [
//     {
//         id: '1',
//         type: 'custom',
//         data: {
//             label: 'Initial Node',
//             icon: <Play className="w-4 h-4 text-emerald-500" />
//         },
//         position: { x: 250, y: 50 },
//     },
//     {
//         id: '2',
//         type: 'custom',
//         data: {
//             label: 'Branch Node',
//             description: 'Decision Point',
//             icon: <GitBranch className="w-4 h-4 text-amber-500" />
//         },
//         position: { x: 250, y: 250 },
//     },
//     {
//         id: '3',
//         type: 'custom',
//         data: {
//             label: 'Join Node',
//             description: 'Merge Point',
//             icon: <GitMerge className="w-4 h-4 text-indigo-500" />
//         },
//         position: { x: 500, y: 150 },
//     },
//     {
//         id: '4',
//         type: 'custom',
//         data: {
//             label: 'Output Node',
//             icon: <CheckCircle className="w-4 h-4 text-rose-500" />
//         },
//         position: { x: 50, y: 180 },
//     },
// ];

// const initialEdges = [
//     {
//         id: 'e1-2',
//         source: '1',
//         target: '2',
//         sourceHandle: 'bottom-source',
//         targetHandle: 'top-target',
//         animated: true,
//         type: 'smoothstep',
//         style: { strokeWidth: 2 },
//         markerEnd: { type: MarkerType.ArrowClosed }
//     },
//     {
//         id: 'e2-4',
//         source: '2',
//         target: '4',
//         sourceHandle: 'left-source',
//         targetHandle: 'right-target',
//         animated: true,
//         type: 'smoothstep',
//         style: { stroke: '#10b981', strokeWidth: 2 },
//         markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' }
//     },
//     {
//         id: 'e1-3',
//         source: '1',
//         target: '3',
//         sourceHandle: 'right-source',
//         targetHandle: 'left-target',
//         animated: true,
//         type: 'smoothstep',
//         style: { stroke: '#f59e0b', strokeWidth: 2 },
//         markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' }
//     },
// ];

// export const ProjectFlow = () => {
//     const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//     const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
//     const [nodeName, setNodeName] = useState('');
//     const [nodeDescription, setNodeDescription] = useState('');
//     const [selectedIcon, setSelectedIcon] = useState('Play');
//     const [selectedColor, setSelectedColor] = useState('text-emerald-500');
//     const [customNodeTypes, setCustomNodeTypes] = useState(defaultNodeTypes);
//     const [selectedNode, setSelectedNode] = useState(null);
//     const [selectedEdge, setSelectedEdge] = useState(null);
//     const [edgeType, setEdgeType] = useState('default');
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//     const [showCustomTypeForm, setShowCustomTypeForm] = useState(false);
//     const [newTypeName, setNewTypeName] = useState('');
//     const [newTypeIcon, setNewTypeIcon] = useState('Box');
//     const [newTypeColor, setNewTypeColor] = useState('text-blue-500');
//     const [selectedNodeType, setSelectedNodeType] = useState('Initial');

//     const onConnect = useCallback(
//         (params) => {
//             const edgeStyle = edgeType === 'branch' ? { stroke: '#f59e0b', strokeWidth: 2 } :
//                 edgeType === 'join' ? { stroke: '#8b5cf6', strokeWidth: 2 } :
//                     edgeType === 'transform' ? { stroke: '#06b6d4', strokeWidth: 2 } :
//                         { strokeWidth: 2 };

//             const markerColor = edgeType === 'branch' ? '#f59e0b' :
//                 edgeType === 'join' ? '#8b5cf6' :
//                     edgeType === 'transform' ? '#06b6d4' : '#3b82f6';

//             setEdges((eds) => addEdge({
//                 ...params,
//                 animated: true,
//                 type: 'smoothstep',
//                 style: edgeStyle,
//                 markerEnd: { type: MarkerType.ArrowClosed, color: markerColor }
//             }, eds));
//         },
//         [setEdges, edgeType]
//     );

//     const addCustomNodeType = () => {
//         if (!newTypeName.trim()) return;

//         const newType = {
//             name: newTypeName,
//             icon: newTypeIcon,
//             color: newTypeColor
//         };

//         setCustomNodeTypes([...customNodeTypes, newType]);
//         setNewTypeName('');
//         setShowCustomTypeForm(false);
//     };

//     const deleteCustomNodeType = (typeName) => {
//         setCustomNodeTypes(customNodeTypes.filter(t => t.name !== typeName));
//     };

//     const addNode = () => {
//         if (!nodeName.trim()) return;

//         const IconComponent = availableIcons[selectedIcon];
//         const newNode = {
//             id: `${Date.now()}`,
//             type: 'custom',
//             data: {
//                 label: nodeName,
//                 description: nodeDescription,
//                 icon: <IconComponent className={`w-4 h-4 ${selectedColor}`} />
//             },
//             position: {
//                 x: Math.random() * 400 + 100,
//                 y: Math.random() * 400 + 100
//             },
//         };

//         setNodes((nds) => [...nds, newNode]);
//         setNodeName('');
//         setNodeDescription('');
//     };

//     const deleteNode = () => {
//         if (!selectedNode) return;

//         setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
//         setEdges((eds) => eds.filter((edge) =>
//             edge.source !== selectedNode.id && edge.target !== selectedNode.id
//         ));
//         setSelectedNode(null);
//     };

//     const deleteEdge = () => {
//         if (!selectedEdge) return;

//         setEdges((eds) => eds.filter((edge) => edge.id !== selectedEdge.id));
//         setSelectedEdge(null);
//     };

//     const onNodeClick = useCallback((event, node) => {
//         setSelectedNode(node);
//         setSelectedEdge(null);
//     }, []);

//     const onEdgeClick = useCallback((event, edge) => {
//         setSelectedEdge(edge);
//         setSelectedNode(null);
//     }, []);

//     const onPaneClick = useCallback(() => {
//         setSelectedNode(null);
//         setSelectedEdge(null);
//     }, []);

//     const handleNodeTypeSelect = (typeName) => {
//         setSelectedNodeType(typeName);
//         const nodeType = customNodeTypes.find(t => t.name === typeName);
//         if (nodeType) {
//             setSelectedIcon(nodeType.icon);
//             setSelectedColor(nodeType.color);
//         }
//     };

//     return (
//         <div className="w-full flex relative bg-gray-50">
//             {/* Sidebar */}
//             <div
//                 className={`transition-all min-h-[830px] rounded-sm duration-300 ease-in-out ${isSidebarOpen ? 'w-96' : 'w-0'
//                     } overflow-hidden bg-white border-r border-gray-200 border`}
//             >
//                 <div className="w-96 h-full flex flex-col">
//                     {/* Header */}
//                     <div className="px-6 py-5 border-b border-gray-200 bg-linear-to-r from-blue-50 to-indigo-50">
//                         <div className="flex items-center gap-3">
//                             <div className="p-2 bg-blue-600 rounded-lg">
//                                 <Network className="w-5 h-5 text-white" />
//                             </div>
//                             <div>
//                                 <h2 className="text-lg font-bold text-gray-900">Flow Builder</h2>
//                                 <p className="text-xs text-gray-600">Custom node types</p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Scrollable Content */}
//                     <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
//                         {/* Custom Node Types Management */}
//                         <div className="space-y-4">
//                             <div className="flex items-center justify-between mb-3">
//                                 <div className="flex items-center gap-2">
//                                     <Box className="w-4 h-4 text-gray-600" />
//                                     <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
//                                         Node Types
//                                     </h3>
//                                 </div>
//                                 <Button
//                                     size="sm"
//                                     variant="outline"
//                                     onClick={() => setShowCustomTypeForm(!showCustomTypeForm)}
//                                     className="h-7 text-xs"
//                                 >
//                                     <Plus className="w-3 h-3 mr-1" />
//                                     New Type
//                                 </Button>
//                             </div>

//                             {showCustomTypeForm && (
//                                 <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
//                                     <Input
//                                         placeholder="Type name"
//                                         value={newTypeName}
//                                         onChange={(e) => setNewTypeName(e.target.value)}
//                                         className="h-9"
//                                     />
//                                     <Select value={newTypeIcon} onValueChange={setNewTypeIcon}>
//                                         <SelectTrigger className="h-9">
//                                             <SelectValue />
//                                         </SelectTrigger>
//                                         <SelectContent className="max-h-60">
//                                             {Object.keys(availableIcons).map((iconName) => {
//                                                 const Icon = availableIcons[iconName];
//                                                 return (
//                                                     <SelectItem key={iconName} value={iconName}>
//                                                         <div className="flex items-center gap-2">
//                                                             <Icon className="w-4 h-4" />
//                                                             <span>{iconName}</span>
//                                                         </div>
//                                                     </SelectItem>
//                                                 );
//                                             })}
//                                         </SelectContent>
//                                     </Select>
//                                     <Select value={newTypeColor} onValueChange={setNewTypeColor}>
//                                         <SelectTrigger className="h-9">
//                                             <SelectValue />
//                                         </SelectTrigger>
//                                         <SelectContent>
//                                             {iconColors.map((color) => (
//                                                 <SelectItem key={color.value} value={color.value}>
//                                                     <div className="flex items-center gap-2">
//                                                         <div className={`w-4 h-4 rounded-full bg-current ${color.value}`}></div>
//                                                         <span>{color.name}</span>
//                                                     </div>
//                                                 </SelectItem>
//                                             ))}
//                                         </SelectContent>
//                                     </Select>
//                                     <div className="flex gap-2">
//                                         <Button onClick={addCustomNodeType} size="sm" className="flex-1 h-8">
//                                             Add
//                                         </Button>
//                                         <Button onClick={() => setShowCustomTypeForm(false)} variant="outline" size="sm" className="h-8">
//                                             Cancel
//                                         </Button>
//                                     </div>
//                                 </div>
//                             )}

//                             <div className="space-y-2 max-h-40 overflow-y-auto">
//                                 {customNodeTypes.map((type) => {
//                                     const Icon = availableIcons[type.icon];
//                                     return (
//                                         <div key={type.name} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-2">
//                                             <div className="flex items-center gap-2">
//                                                 <Icon className={`w-4 h-4 ${type.color}`} />
//                                                 <span className="text-sm font-medium">{type.name}</span>
//                                             </div>
//                                             <Button
//                                                 size="sm"
//                                                 variant="ghost"
//                                                 onClick={() => deleteCustomNodeType(type.name)}
//                                                 className="h-6 w-6 p-0"
//                                             >
//                                                 <Trash className="w-3 h-3" />
//                                             </Button>
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         </div>

//                         {/* Add Node Section */}
//                         <div className="space-y-4 pt-6 border-t border-gray-200">
//                             <div className="flex items-center gap-2 mb-3">
//                                 <Settings className="w-4 h-4 text-gray-600" />
//                                 <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
//                                     New Node
//                                 </h3>
//                             </div>

//                             <div className="space-y-4">
//                                 <div className="space-y-2">
//                                     <Label htmlFor="nodeType" className="text-sm font-medium text-gray-700">
//                                         Node Type
//                                     </Label>
//                                     <Select value={selectedNodeType} onValueChange={handleNodeTypeSelect}>
//                                         <SelectTrigger id="nodeType" className="h-10">
//                                             <SelectValue />
//                                         </SelectTrigger>
//                                         <SelectContent>
//                                             {customNodeTypes.map((type) => {
//                                                 const Icon = availableIcons[type.icon];
//                                                 return (
//                                                     <SelectItem key={type.name} value={type.name}>
//                                                         <div className="flex items-center gap-2">
//                                                             <Icon className={`w-4 h-4 ${type.color}`} />
//                                                             <span>{type.name}</span>
//                                                         </div>
//                                                     </SelectItem>
//                                                 );
//                                             })}
//                                         </SelectContent>
//                                     </Select>
//                                 </div>

//                                 <div className="space-y-2">
//                                     <Label htmlFor="nodeName" className="text-sm font-medium text-gray-700">
//                                         Node Name
//                                     </Label>
//                                     <Input
//                                         id="nodeName"
//                                         placeholder="Enter node name"
//                                         value={nodeName}
//                                         onChange={(e) => setNodeName(e.target.value)}
//                                         onKeyPress={(e) => e.key === 'Enter' && addNode()}
//                                         className="h-10"
//                                     />
//                                 </div>

//                                 <div className="space-y-2">
//                                     <Label htmlFor="nodeDescription" className="text-sm font-medium text-gray-700">
//                                         Description
//                                     </Label>
//                                     <Input
//                                         id="nodeDescription"
//                                         placeholder="Enter description"
//                                         value={nodeDescription}
//                                         onChange={(e) => setNodeDescription(e.target.value)}
//                                         className="h-10"
//                                     />
//                                 </div>

//                                 <Button size="sm" onClick={addNode} className="w-full text-sm bg-primary">
//                                     <Plus className="w-4 h-4 mr-2" />
//                                     Add Node
//                                 </Button>
//                             </div>
//                         </div>

//                         {/* Connection Settings */}
//                         <div className="pt-6 border-t border-gray-200 space-y-4">
//                             <div className="flex items-center gap-2 mb-3">
//                                 <Link2 className="w-4 h-4 text-gray-600" />
//                                 <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
//                                     Connection Style
//                                 </h3>
//                             </div>

//                             <div className="space-y-2">
//                                 <Label htmlFor="edgeType" className="text-sm font-medium text-gray-700">
//                                     Connection Color
//                                 </Label>
//                                 <Select value={edgeType} onValueChange={setEdgeType}>
//                                     <SelectTrigger id="edgeType" className="h-10">
//                                         <SelectValue />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value="default">
//                                             <div className="flex items-center gap-2">
//                                                 <div className="w-8 h-0.5 bg-blue-500"></div>
//                                                 <span>Default (Blue)</span>
//                                             </div>
//                                         </SelectItem>
//                                         <SelectItem value="branch">
//                                             <div className="flex items-center gap-2">
//                                                 <div className="w-8 h-0.5 bg-amber-500"></div>
//                                                 <span>Branch (Orange)</span>
//                                             </div>
//                                         </SelectItem>
//                                         <SelectItem value="join">
//                                             <div className="flex items-center gap-2">
//                                                 <div className="w-8 h-0.5 bg-purple-500"></div>
//                                                 <span>Join (Purple)</span>
//                                             </div>
//                                         </SelectItem>
//                                         <SelectItem value="transform">
//                                             <div className="flex items-center gap-2">
//                                                 <div className="w-8 h-0.5 bg-cyan-500"></div>
//                                                 <span>Transform (Cyan)</span>
//                                             </div>
//                                         </SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </div>
//                         </div>

//                         {/* Selected Node */}
//                         {selectedNode && (
//                             <div className="space-y-3 pt-6 border-t border-gray-200">
//                                 <div className="flex items-center gap-2 mb-3">
//                                     <Info className="w-4 h-4 text-gray-600" />
//                                     <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
//                                         Selected
//                                     </h3>
//                                 </div>
//                                 <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
//                                     <div className="flex items-start gap-3">
//                                         <div className="mt-1">
//                                             {selectedNode.data.icon}
//                                         </div>
//                                         <div className="flex-1">
//                                             <p className="text-sm font-semibold text-gray-900">{selectedNode.data.label}</p>
//                                             {selectedNode.data.description && (
//                                                 <p className="text-xs text-gray-600 mt-1">{selectedNode.data.description}</p>
//                                             )}
//                                         </div>
//                                     </div>
//                                     <Button
//                                         onClick={deleteNode}
//                                         variant="destructive"
//                                         size="sm"
//                                         className="w-full h-9"
//                                     >
//                                         <Trash2 className="w-4 h-4 mr-2" />
//                                         Delete Node
//                                     </Button>
//                                 </div>
//                             </div>
//                         )}

//                         {/* Selected Edge */}
//                         {selectedEdge && (
//                             <div className="space-y-3 pt-6 border-t border-gray-200">
//                                 <div className="flex items-center gap-2 mb-3">
//                                     <Link2 className="w-4 h-4 text-gray-600" />
//                                     <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
//                                         Connection
//                                     </h3>
//                                 </div>
//                                 <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
//                                     <div>
//                                         <p className="text-sm font-semibold text-gray-900">
//                                             {selectedEdge.label || 'Connection'}
//                                         </p>
//                                         <p className="text-xs text-gray-600 mt-1">
//                                             {nodes.find(n => n.id === selectedEdge.source)?.data.label} → {nodes.find(n => n.id === selectedEdge.target)?.data.label}
//                                         </p>
//                                     </div>
//                                     <Button
//                                         onClick={deleteEdge}
//                                         variant="destructive"
//                                         size="sm"
//                                         className="w-full h-9"
//                                     >
//                                         <Trash2 className="w-4 h-4 mr-2" />
//                                         Delete Connection
//                                     </Button>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* Toggle Button */}
//             <Button
//                 onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//                 className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-l-none rounded-r-lg h-20 w-10 p-0 shadow-xl transition-all duration-300 bg-white hover:bg-gray-100 border border-gray-300 text-gray-700"
//                 style={{ left: isSidebarOpen ? '384px' : '0px' }}
//             >
//                 {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
//             </Button>

//             {/* Flow Canvas */}
//             <div className="flex-1">
//                 <ReactFlow
//                     nodes={nodes}
//                     edges={edges}
//                     onNodesChange={onNodesChange}
//                     onEdgesChange={onEdgesChange}
//                     onConnect={onConnect}
//                     onNodeClick={onNodeClick}
//                     onEdgeClick={onEdgeClick}
//                     onPaneClick={onPaneClick}
//                     nodeTypes={nodeTypes}
//                     fitView
//                     connectionLineStyle={{ strokeWidth: 2 }}
//                     defaultEdgeOptions={{
//                         type: 'smoothstep',
//                         animated: true,
//                         style: { strokeWidth: 2 }
//                     }}
//                 >
//                     <Controls />
//                     <MiniMap
//                         nodeColor={(node) => {
//                             if (node.data.label.includes('Initial')) return '#10b981';
//                             if (node.data.label.includes('Transform')) return '#06b6d4';
//                             if (node.data.label.includes('Branch')) return '#f59e0b';
//                             if (node.data.label.includes('Join')) return '#8b5cf6';
//                             if (node.data.label.includes('Output')) return '#f43f5e';
//                             return '#3b82f6';
//                         }}
//                     />
//                     <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
//                     <Panel position="top-right" className="bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200">
//                         <div className="flex items-center gap-4 text-xs font-medium text-gray-700">
//                             <div className="flex items-center gap-2">
//                                 <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                                 <span>Nodes: {nodes.length}</span>
//                             </div>
//                             <div className="w-px h-4 bg-gray-300"></div>
//                             <div className="flex items-center gap-2">
//                                 <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
//                                 <span>Connections: {edges.length}</span>
//                             </div>
//                         </div>
//                     </Panel>
//                 </ReactFlow>
//             </div>
//         </div>
//     );
// }

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Edit, FolderArchive, MoreVertical, PackagePlus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Project {
    id: string;
    name: string;
    description: string;
    status: 'active' | 'completed' | 'on-hold' | 'planning';
    startDate: string;
    dueDate: string;
    teamMembers: number;
    progress: number;
}

const sampleProjects: Project[] = [
    {
        id: '1',
        name: 'E-Commerce Platform',
        description: 'Building a modern e-commerce platform with React and Node.js',
        status: 'active',
        startDate: '2024-01-15',
        dueDate: '2024-06-30',
        teamMembers: 5,
        progress: 65,
    },
    {
        id: '2',
        name: 'Mobile App Development',
        description: 'Cross-platform mobile application for task management',
        status: 'active',
        startDate: '2024-02-01',
        dueDate: '2024-08-15',
        teamMembers: 3,
        progress: 40,
    },
    {
        id: '3',
        name: 'Marketing Website',
        description: 'Corporate website redesign with modern UI/UX',
        status: 'completed',
        startDate: '2023-11-01',
        dueDate: '2024-01-31',
        teamMembers: 4,
        progress: 100,
    },
    {
        id: '4',
        name: 'AI Integration',
        description: 'Implementing AI-powered features for customer support',
        status: 'planning',
        startDate: '2024-04-01',
        dueDate: '2024-12-31',
        teamMembers: 6,
        progress: 15,
    },
    {
        id: '5',
        name: 'Dashboard Analytics',
        description: 'Real-time analytics dashboard for business intelligence',
        status: 'on-hold',
        startDate: '2024-03-01',
        dueDate: '2024-09-30',
        teamMembers: 2,
        progress: 30,
    },
];

const statusColors = {
    active: 'bg-green-500/10 text-green-500 hover:bg-green-500/20',
    completed: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20',
    'on-hold': 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20',
    planning: 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20',
};

export const ProjectFlow = () => {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [projects, setProjects] = useState<Project[]>(sampleProjects);

    const handleDelete = (id: string) => {
        setProjects(projects.filter((p) => p.id !== id));
    };

    return (
        <div className="w-full space-y-6 ">
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                        <FolderArchive className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight">Projects Flow</h1>
                        <p className="text-sm text-muted-foreground">
                            Manage and organize your projects
                        </p>
                    </div>
                </div>
                <Button
                    size="sm"
                    className="gap-2"
                    onClick={() => {
                        setIsAddDialogOpen(true);
                        alert('Add Project Flow would open here');
                    }}
                >
                    <PackagePlus className="h-4 w-4" />
                    Add Project Flow
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {projects.map((project) => (
                    <Card key={project.id} className="hover:shadow-sm shadow-xs transition-shadow">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div className="space-y-1 flex-1">
                                    <CardTitle className="text-lg">{project.name}</CardTitle>
                                    <Badge
                                        variant="secondary"
                                        className={statusColors[project.status]}
                                    >
                                        {project.status.charAt(0).toUpperCase() +
                                            project.status.slice(1).replace('-', ' ')}
                                    </Badge>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem className="gap-2">
                                            <Edit className="h-4 w-4" />
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="gap-2 text-destructive"
                                            onClick={() => handleDelete(project.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <CardDescription className="line-clamp-2">
                                {project.description}
                            </CardDescription>
                        </CardHeader>

                    </Card>
                ))}
            </div>
        </div>
    );
};
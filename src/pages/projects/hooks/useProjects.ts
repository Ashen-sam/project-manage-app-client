import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { format } from "date-fns";
import type { PriorityType, StatusType } from "@/components";

interface Member {
  id: number;
  name: string;
  image?: string;
}

interface Project extends Record<string, unknown> {
  id: number;
  name: string;
  status: StatusType;
  priority: PriorityType;
  progress: number;
  dueDate: string;
  startDate?: string;
  members: Member[];
}

interface FormData {
  name: string;
  status: StatusType;
  priority: PriorityType;
  progress: number;
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  members: Member[];
  description: string;
}

const initialProjects: Project[] = [
  {
    id: 1,
    name: "Website Redesign",
    status: "In progress",
    priority: "High",
    progress: 65,
    startDate: "2025-11-01",
    dueDate: "2025-11-15",
    members: [
      {
        id: 1,
        name: "John Doe",
        image: "public/WhatsApp Image 2025-11-01 at 09.00.26_486015ae.jpg",
      },
      {
        id: 2,
        name: "Jane Smith",
        image: "public/WhatsApp Image 2025-11-01 at 09.00.06_3f2744f6.jpg",
      },
      {
        id: 3,
        name: "Mark Taylor",
        image: "public/WhatsApp Image 2025-11-01 at 08.59.01_457f64bf.jpg",
      },
    ],
  },
  {
    id: 2,
    name: "Mobile App Development",
    status: "In review",
    priority: "Medium",
    progress: 20,
    startDate: "2025-11-05",
    dueDate: "2025-12-30",
    members: [
      {
        id: 1,
        name: "Emily Carter",
        image: "public/WhatsApp Image 2025-11-01 at 09.00.47_4ae373f6.jpg",
      },
      {
        id: 2,
        name: "Daniel Lee",
        image: "public/WhatsApp Image 2025-11-01 at 09.01.01_91a45634.jpg",
      },
      {
        id: 3,
        name: "Sophia Patel",
        image: "public/WhatsApp Image 2025-11-01 at 09.01.25_35918156.jpg",
      },
    ],
  },
  {
    id: 3,
    name: "API Documentation Setup",
    status: "Pending",
    priority: "High",
    progress: 85,
    startDate: "2025-11-10",
    dueDate: "2025-11-25",
    members: [
      {
        id: 1,
        name: "Michael Brown",
        image: "public/WhatsApp Image 2025-11-01 at 09.02.05_46b7e5dc.jpg",
      },
      {
        id: 2,
        name: "Olivia Wilson",
        image: "public/WhatsApp Image 2025-11-01 at 09.02.17_ce61baf0.jpg",
      },
      {
        id: 3,
        name: "Ethan Davis",
        image: "public/WhatsApp Image 2025-11-01 at 09.02.50_9470257f.jpg",
      },
      {
        id: 4,
        name: "Ava Martinez",
        image: "public/WhatsApp Image 2025-11-01 at 09.03.26_a38ca278.jpg",
      },
    ],
  },
  {
    id: 4,
    name: "UI Component Library",
    status: "Submitted",
    priority: "Low",
    progress: 50,
    startDate: "2025-11-15",
    dueDate: "2025-12-10",
    members: [
      {
        id: 1,
        name: "Lucas Nguyen",
        image: "public/WhatsApp Image 2025-11-01 at 09.04.04_eada67d7.jpg",
      },
      {
        id: 2,
        name: "Sophia White",
        image: "public/WhatsApp Image 2025-11-01 at 09.04.20_0d674ca2.jpg",
      },
    ],
  },
  {
    id: 5,
    name: "Marketing Campaign Launch",
    status: "Success",
    priority: "Critical",
    progress: 10,
    startDate: "2025-12-01",
    dueDate: "2026-01-15",
    members: [
      {
        id: 1,
        name: "Isabella Green",
        image: "public/WhatsApp Image 2025-11-01 at 09.08.01_5e9bb2fd.jpg",
      },
      {
        id: 2,
        name: "James Hall",
        image: "public/WhatsApp Image 2025-11-01 at 09.08.34_21d4eb3f.jpg",
      },
    ],
  },
  {
    id: 6,
    name: "Internal Dashboard Revamp",
    status: "In progress",
    priority: "Medium",
    progress: 45,
    startDate: "2025-11-20",
    dueDate: "2025-12-20",
    members: [
      {
        id: 1,
        name: "Noah Adams",
        image: "public/WhatsApp Image 2025-11-01 at 09.09.24_e5fdd616.jpg",
      },
      {
        id: 2,
        name: "Grace Miller",
        image: "public/WhatsApp Image 2025-11-01 at 09.09.41_97579695.jpg",
      },
      {
        id: 3,
        name: "Henry Clark",
        image: "public/WhatsApp Image 2025-11-01 at 09.10.42_df685104.jpg",
      },
    ],
  },
  {
    id: 5,
    name: "Marketing Campaign Launch",
    status: "Success",
    priority: "Critical",
    progress: 10,
    startDate: "2025-12-01",
    dueDate: "2026-01-15",
    members: [
      {
        id: 1,
        name: "Isabella Green",
        image: "public/WhatsApp Image 2025-11-01 at 09.08.01_5e9bb2fd.jpg",
      },
      {
        id: 2,
        name: "James Hall",
        image: "public/WhatsApp Image 2025-11-01 at 09.08.34_21d4eb3f.jpg",
      },
    ],
  },
  {
    id: 2,
    name: "Mobile App Development",
    status: "In review",
    priority: "Medium",
    progress: 20,
    startDate: "2025-11-05",
    dueDate: "2025-12-30",
    members: [
      {
        id: 1,
        name: "Emily Carter",
        image: "public/WhatsApp Image 2025-11-01 at 09.00.47_4ae373f6.jpg",
      },
      {
        id: 2,
        name: "Daniel Lee",
        image: "public/WhatsApp Image 2025-11-01 at 09.01.01_91a45634.jpg",
      },
      {
        id: 3,
        name: "Sophia Patel",
        image: "public/WhatsApp Image 2025-11-01 at 09.01.25_35918156.jpg",
      },
    ],
  },
  {
    id: 3,
    name: "API Documentation Setup",
    status: "Pending",
    priority: "High",
    progress: 85,
    startDate: "2025-11-10",
    dueDate: "2025-11-25",
    members: [
      {
        id: 1,
        name: "Michael Brown",
        image: "public/WhatsApp Image 2025-11-01 at 09.02.05_46b7e5dc.jpg",
      },
      {
        id: 2,
        name: "Olivia Wilson",
        image: "public/WhatsApp Image 2025-11-01 at 09.02.17_ce61baf0.jpg",
      },
      {
        id: 3,
        name: "Ethan Davis",
        image: "public/WhatsApp Image 2025-11-01 at 09.02.50_9470257f.jpg",
      },
      {
        id: 4,
        name: "Ava Martinez",
        image: "public/WhatsApp Image 2025-11-01 at 09.03.26_a38ca278.jpg",
      },
    ],
  },
];

const initialFormData: FormData = {
  name: "",
  status: "Planning" as StatusType,
  priority: "Medium" as PriorityType,
  progress: 0,
  dateRange: {
    from: undefined,
    to: undefined,
  },
  members: [] as Member[],
  description: "",
};

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const navigate = useNavigate();

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleAddProject = () => {
    if (!formData.name.trim()) {
      toast.error("Project name is required");
      return;
    }

    const newProject: Project = {
      id: Math.max(...projects.map((p) => p.id), 0) + 1,
      name: formData.name,
      status: formData.status,
      priority: formData.priority,
      progress: formData.progress,
      startDate: formData.dateRange.from
        ? format(formData.dateRange.from, "yyyy-MM-dd")
        : "",
      dueDate: formData.dateRange.to
        ? format(formData.dateRange.to, "yyyy-MM-dd")
        : "",
      members: formData.members,
      description: "",
    };
    setProjects([...projects, newProject]);
    setIsAddDialogOpen(false);
    resetForm();
    toast.success("Project created successfully", {
      description: `${formData.name} has been added to your projects`,
    });
  };

  const handleEditClick = (project: Project) => {
    setSelectedProject(project);
    setFormData({
      name: project.name,
      status: project.status,
      priority: project.priority,
      progress: project.progress,
      dateRange: {
        from: project.startDate ? new Date(project.startDate) : undefined,
        to: project.dueDate ? new Date(project.dueDate) : undefined,
      },
      members: project.members,
      description: "",
    });
    setIsEditDialogOpen(true);
  };

  const handleRowClick = (project: Project) => {
    navigate(`/projects/${project.id}/`);
  };

  const handleUpdateProject = () => {
    if (!formData.name.trim()) {
      toast.error("Project name is required");
      return;
    }

    if (selectedProject) {
      setProjects(
        projects.map((p) =>
          p.id === selectedProject.id
            ? {
                ...selectedProject,
                name: formData.name,
                status: formData.status,
                priority: formData.priority,
                progress: formData.progress,
                startDate: formData.dateRange.from
                  ? format(formData.dateRange.from, "yyyy-MM-dd")
                  : "",
                dueDate: formData.dateRange.to
                  ? format(formData.dateRange.to, "yyyy-MM-dd")
                  : "",
                members: formData.members,
              }
            : p
        )
      );
      setIsEditDialogOpen(false);
      setSelectedProject(null);
      resetForm();
      toast.success("Project updated successfully", {
        description: `${formData.name} has been updated`,
      });
    }
  };

  const handleDeleteClick = (project: Project) => {
    setSelectedProject(project);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteProject = () => {
    if (selectedProject) {
      setProjects(projects.filter((p) => p.id !== selectedProject.id));
      const projectName = selectedProject.name;
      setIsDeleteDialogOpen(false);
      setSelectedProject(null);
      toast.success("Project deleted", {
        description: `${projectName} has been permanently deleted`,
      });
    }
  };

  return {
    projects,
    isAddDialogOpen,
    isEditDialogOpen,
    isDeleteDialogOpen,
    selectedProject,
    formData,
    setIsAddDialogOpen,
    setIsEditDialogOpen,
    setIsDeleteDialogOpen,
    setFormData,
    handleAddProject,
    handleEditClick,
    handleRowClick,
    handleUpdateProject,
    handleDeleteClick,
    handleDeleteProject,
    resetForm,
  };
};

export type { Project, Member, FormData };

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/shared/lib/supabase-client";

type Tab = "events" | "classes" | "repertory" | "hero";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("events");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);

  // States for CRUD
  const [events, setEvents] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [repertory, setRepertory] = useState<any[]>([]);
  const [contents, setContents] = useState<Record<string, string>>({});

  // CRUD Loading states
  const [actionLoading, setActionLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Modals / Forms States
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"event" | "class" | "repertory">("event");
  const [editItem, setEditItem] = useState<any | null>(null); // Null means create

  // Form Fields
  const [eventForm, setEventForm] = useState({
    date_day: "",
    date_month: "",
    date_year: "",
    title: "",
    location: "",
    type: "Workshop",
    theme: "",
    teacher: "",
    ticket_url: "",
  });

  const [classForm, setClassForm] = useState({
    number: "",
    title: "",
    subtitle: "",
    schedule: "",
    description: "",
    highlightsRaw: "", // Comma-separated
    whatsapp_message: "",
    accent_color: "primary",
  });

  const [repertoryForm, setRepertoryForm] = useState({
    title: "",
    subtitle: "",
    image_url: "",
  });

  const [heroForm, setHeroForm] = useState({
    hero_title: "",
    hero_subtitle: "",
    hero_description: "",
    hero_image_url: "",
  });

  const [uploadingImage, setUploadingImage] = useState(false);

  // Authentication check
  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/admin/login");
      } else {
        setUserEmail(user.email || "");
        fetchData();
      }
    };
    checkUser();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      // Fetch all data in parallel
      const [eventsRes, classesRes, repertoryRes, contentsRes] = await Promise.all([
        fetch("/api/admin/events").then((r) => r.json()),
        fetch("/api/admin/classes").then((r) => r.json()),
        fetch("/api/admin/repertory").then((r) => r.json()),
        fetch("/api/admin/contents").then((r) => r.json()),
      ]);

      if (Array.isArray(eventsRes)) setEvents(eventsRes);
      if (Array.isArray(classesRes)) setClasses(classesRes);
      if (Array.isArray(repertoryRes)) setRepertory(repertoryRes);

      if (Array.isArray(contentsRes)) {
        const contentsMap: Record<string, string> = {};
        contentsRes.forEach((c: any) => {
          contentsMap[c.key] = c.value;
        });
        setContents(contentsMap);
        setHeroForm({
          hero_title: contentsMap.hero_title || "",
          hero_subtitle: contentsMap.hero_subtitle || "",
          hero_description: contentsMap.hero_description || "",
          hero_image_url: contentsMap.hero_image_url || "",
        });
      }
    } catch (err: any) {
      setErrorMsg("Erro ao carregar dados do banco.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
    router.push("/admin/login");
  };

  // Image Upload helper
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetField: "repertory" | "hero") => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setErrorMsg("");
    setSuccessMsg("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (targetField === "repertory") {
        setRepertoryForm((prev) => ({ ...prev, image_url: data.publicUrl }));
      } else {
        setHeroForm((prev) => ({ ...prev, hero_image_url: data.publicUrl }));
      }
      setSuccessMsg("Upload concluído com sucesso!");
    } catch (err: any) {
      setErrorMsg(err.message || "Erro no upload da imagem");
    } finally {
      setUploadingImage(false);
    }
  };

  // CRUD Operations
  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const url = editItem ? `/api/admin/events/${editItem.id}` : "/api/admin/events";
    const method = editItem ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventForm),
      });
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      setSuccessMsg(editItem ? "Evento atualizado com sucesso!" : "Evento criado com sucesso!");
      setShowModal(false);
      fetchData();
    } catch (err: any) {
      setErrorMsg(err.message || "Erro ao salvar evento");
    } finally {
      setActionLoading(false);
    }
  };

  const handleSaveClass = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const url = editItem ? `/api/admin/classes/${editItem.id}` : "/api/admin/classes";
    const method = editItem ? "PUT" : "POST";

    // Transform raw highlights comma list to array
    const highlights = classForm.highlightsRaw
      .split(",")
      .map((h) => h.trim())
      .filter((h) => h !== "");

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...classForm,
          highlights,
        }),
      });
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      setSuccessMsg(editItem ? "Turma atualizada com sucesso!" : "Turma criada com sucesso!");
      setShowModal(false);
      fetchData();
    } catch (err: any) {
      setErrorMsg(err.message || "Erro ao salvar turma");
    } finally {
      setActionLoading(false);
    }
  };

  const handleSaveRepertory = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const url = editItem ? `/api/admin/repertory/${editItem.id}` : "/api/admin/repertory";
    const method = editItem ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(repertoryForm),
      });
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      setSuccessMsg(editItem ? "Espetáculo atualizado com sucesso!" : "Espetáculo criado com sucesso!");
      setShowModal(false);
      fetchData();
    } catch (err: any) {
      setErrorMsg(err.message || "Erro ao salvar espetáculo");
    } finally {
      setActionLoading(false);
    }
  };

  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    // Prepare batch site contents list
    const batch = [
      { section: "hero", key: "hero_title", value: heroForm.hero_title, type: "text" },
      { section: "hero", key: "hero_subtitle", value: heroForm.hero_subtitle, type: "text" },
      { section: "hero", key: "hero_description", value: heroForm.hero_description, type: "text" },
      { section: "hero", key: "hero_image_url", value: heroForm.hero_image_url, type: "image_url" },
    ];

    try {
      const res = await fetch("/api/admin/contents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(batch),
      });
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      setSuccessMsg("Textos do Hero atualizados com sucesso!");
      fetchData();
    } catch (err: any) {
      setErrorMsg(err.message || "Erro ao salvar conteúdos");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteItem = async (type: "event" | "class" | "repertory", id: string) => {
    if (!confirm("Tem certeza absoluta que deseja excluir este item?")) return;

    setActionLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const url = `/api/admin/${type === "class" ? "classes" : type === "repertory" ? "repertory" : "events"}/${id}`;

    try {
      const res = await fetch(url, { method: "DELETE" });
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      setSuccessMsg("Item excluído com sucesso!");
      fetchData();
    } catch (err: any) {
      setErrorMsg(err.message || "Erro ao excluir item");
    } finally {
      setActionLoading(false);
    }
  };

  const openModal = (type: "event" | "class" | "repertory", item: any = null) => {
    setModalType(type);
    setEditItem(item);
    setErrorMsg("");
    setSuccessMsg("");

    if (type === "event") {
      setEventForm(
        item
          ? {
              date_day: item.date_day,
              date_month: item.date_month,
              date_year: item.date_year,
              title: item.title,
              location: item.location,
              type: item.type,
              theme: item.theme || "",
              teacher: item.teacher || "",
              ticket_url: item.ticket_url || "",
            }
          : {
              date_day: "",
              date_month: "",
              date_year: "",
              title: "",
              location: "",
              type: "Workshop",
              theme: "",
              teacher: "",
              ticket_url: "",
            }
      );
    } else if (type === "class") {
      setClassForm(
        item
          ? {
              number: item.number,
              title: item.title,
              subtitle: item.subtitle,
              schedule: item.schedule,
              description: item.description,
              highlightsRaw: (item.highlights || []).join(", "),
              whatsapp_message: item.whatsapp_message,
              accent_color: item.accent_color,
            }
          : {
              number: "",
              title: "",
              subtitle: "",
              schedule: "",
              description: "",
              highlightsRaw: "",
              whatsapp_message: "",
              accent_color: "primary",
            }
      );
    } else if (type === "repertory") {
      setRepertoryForm(
        item
          ? {
              title: item.title,
              subtitle: item.subtitle,
              image_url: item.image_url,
            }
          : {
              title: "",
              subtitle: "",
              image_url: "",
            }
      );
    }

    setShowModal(true);
  };

  return (
    <main className="flex min-h-screen bg-background text-foreground font-sans relative">
      {/* Sidebar Nav */}
      <aside className="w-64 border-r border-tertiary-dark/20 flex flex-col justify-between p-6 bg-foreground/[0.01]">
        <div className="flex flex-col gap-8">
          <div className="border-b border-tertiary-dark/20 pb-4">
            <h1 className="text-xl font-display font-black tracking-tight uppercase">
              DPD <span className="text-primary">ADMIN</span>
            </h1>
            <p className="text-[10px] font-mono text-tertiary-dark uppercase tracking-widest mt-1">
              {userEmail}
            </p>
          </div>

          <nav className="flex flex-col gap-2">
            <button
              onClick={() => {
                setActiveTab("events");
                setErrorMsg("");
                setSuccessMsg("");
              }}
              className={`text-left px-4 py-3 font-mono text-xs uppercase tracking-wider transition-colors duration-300 border ${
                activeTab === "events"
                  ? "bg-primary text-background border-primary font-bold"
                  : "border-transparent text-tertiary hover:text-foreground hover:bg-foreground/5"
              } cursor-pointer`}
            >
              📅 Eventos / Datas
            </button>
            <button
              onClick={() => {
                setActiveTab("repertory");
                setErrorMsg("");
                setSuccessMsg("");
              }}
              className={`text-left px-4 py-3 font-mono text-xs uppercase tracking-wider transition-colors duration-300 border ${
                activeTab === "repertory"
                  ? "bg-primary text-background border-primary font-bold"
                  : "border-transparent text-tertiary hover:text-foreground hover:bg-foreground/5"
              } cursor-pointer`}
            >
              🎭 Espetáculos
            </button>
            <button
              onClick={() => {
                setActiveTab("classes");
                setErrorMsg("");
                setSuccessMsg("");
              }}
              className={`text-left px-4 py-3 font-mono text-xs uppercase tracking-wider transition-colors duration-300 border ${
                activeTab === "classes"
                  ? "bg-primary text-background border-primary font-bold"
                  : "border-transparent text-tertiary hover:text-foreground hover:bg-foreground/5"
              } cursor-pointer`}
            >
              💃 Turmas de Dança
            </button>
            <button
              onClick={() => {
                setActiveTab("hero");
                setErrorMsg("");
                setSuccessMsg("");
              }}
              className={`text-left px-4 py-3 font-mono text-xs uppercase tracking-wider transition-colors duration-300 border ${
                activeTab === "hero"
                  ? "bg-primary text-background border-primary font-bold"
                  : "border-transparent text-tertiary hover:text-foreground hover:bg-foreground/5"
              } cursor-pointer`}
            >
              ✍️ Conteúdo do Hero
            </button>
          </nav>
        </div>

        <div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500/10 border border-red-500/30 hover:bg-red-500 hover:text-white hover:border-red-500 text-red-400 py-3 font-mono text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer"
          >
            Sair do Painel
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <section className="flex-1 p-8 md:p-12 overflow-y-auto">
        {/* Messages */}
        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 text-xs font-mono uppercase tracking-wider mb-6">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="bg-primary/10 border border-primary/30 text-primary-light p-4 text-xs font-mono uppercase tracking-wider mb-6">
            {successMsg}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col gap-4 py-12">
            <div className="h-8 bg-foreground/5 animate-pulse w-1/4 border border-tertiary-dark/10" />
            <div className="h-64 bg-foreground/5 animate-pulse w-full border border-tertiary-dark/10" />
          </div>
        ) : (
          <>
            {/* TAB EVENTS */}
            {activeTab === "events" && (
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center border-b border-tertiary-dark/20 pb-4">
                  <div>
                    <h2 className="text-3xl font-display font-bold uppercase">Gerenciar Eventos</h2>
                    <p className="text-xs font-mono text-tertiary uppercase mt-1">
                      Cronograma e Workshops futuros
                    </p>
                  </div>
                  <button
                    onClick={() => openModal("event")}
                    className="bg-foreground text-background font-mono text-xs font-bold uppercase px-6 py-3 hover:bg-primary transition-colors cursor-pointer"
                  >
                    + Novo Evento
                  </button>
                </div>

                <div className="flex flex-col border border-tertiary-dark/20">
                  <div className="grid grid-cols-12 bg-foreground/5 p-4 border-b border-tertiary-dark/20 font-mono text-xs uppercase text-tertiary">
                    <div className="col-span-2">Data</div>
                    <div className="col-span-3">Título</div>
                    <div className="col-span-2">Tipo</div>
                    <div className="col-span-3">Localização</div>
                    <div className="col-span-2 text-right">Ações</div>
                  </div>

                  {events.length === 0 ? (
                    <div className="p-8 text-center text-sm font-mono text-tertiary">
                      Nenhum evento cadastrado no banco.
                    </div>
                  ) : (
                    events.map((event) => (
                      <div
                        key={event.id}
                        className="grid grid-cols-12 p-4 border-b border-tertiary-dark/10 last:border-none text-sm items-center hover:bg-foreground/[0.01]"
                      >
                        <div className="col-span-2 font-mono text-xs text-primary font-bold">
                          {event.date_day} {event.date_month} {event.date_year}
                        </div>
                        <div className="col-span-3 font-bold uppercase">{event.title}</div>
                        <div className="col-span-2">
                          <span className="text-[10px] font-mono border px-2 py-0.5 bg-foreground/5 uppercase tracking-wider">
                            {event.type}
                          </span>
                        </div>
                        <div className="col-span-3 text-tertiary text-xs font-mono">
                          {event.location}
                        </div>
                        <div className="col-span-2 text-right flex justify-end gap-2">
                          <button
                            onClick={() => openModal("event", event)}
                            className="px-3 py-1.5 border border-tertiary-dark/30 hover:border-primary text-xs font-mono uppercase cursor-pointer"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteItem("event", event.id)}
                            className="px-3 py-1.5 border border-red-500/30 hover:bg-red-500 hover:text-white text-red-400 text-xs font-mono uppercase cursor-pointer"
                          >
                            Excluir
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB REPERTORY */}
            {activeTab === "repertory" && (
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center border-b border-tertiary-dark/20 pb-4">
                  <div>
                    <h2 className="text-3xl font-display font-bold uppercase">Gerenciar Espetáculos</h2>
                    <p className="text-xs font-mono text-tertiary uppercase mt-1">
                      Eventos & Repertório histórico
                    </p>
                  </div>
                  <button
                    onClick={() => openModal("repertory")}
                    className="bg-foreground text-background font-mono text-xs font-bold uppercase px-6 py-3 hover:bg-primary transition-colors cursor-pointer"
                  >
                    + Novo Espetáculo
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {repertory.length === 0 ? (
                    <div className="col-span-3 p-8 border border-dashed border-tertiary-dark/20 text-center text-sm font-mono text-tertiary">
                      Nenhum espetáculo cadastrado no banco.
                    </div>
                  ) : (
                    repertory.map((item) => (
                      <div
                        key={item.id}
                        className="border border-tertiary-dark/20 overflow-hidden flex flex-col bg-foreground/[0.01]"
                      >
                        <div className="aspect-video relative w-full bg-background border-b border-tertiary-dark/10">
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="object-cover w-full h-full grayscale"
                          />
                        </div>
                        <div className="p-4 flex flex-col gap-2 flex-grow">
                          <p className="text-xs font-mono text-secondary uppercase tracking-widest">
                            {item.subtitle}
                          </p>
                          <h3 className="text-xl font-display font-bold uppercase flex-grow">
                            {item.title}
                          </h3>
                          <div className="flex gap-2 mt-4 pt-4 border-t border-tertiary-dark/10">
                            <button
                              onClick={() => openModal("repertory", item)}
                              className="flex-1 py-2 border border-tertiary-dark/30 hover:border-primary text-center text-xs font-mono uppercase cursor-pointer"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDeleteItem("repertory", item.id)}
                              className="px-4 py-2 border border-red-500/30 hover:bg-red-500 hover:text-white text-red-400 text-xs font-mono uppercase cursor-pointer"
                            >
                              Excluir
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB CLASSES */}
            {activeTab === "classes" && (
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center border-b border-tertiary-dark/20 pb-4">
                  <div>
                    <h2 className="text-3xl font-display font-bold uppercase">Gerenciar Turmas</h2>
                    <p className="text-xs font-mono text-tertiary uppercase mt-1">
                      Turmas de dança ofertadas
                    </p>
                  </div>
                  <button
                    onClick={() => openModal("class")}
                    className="bg-foreground text-background font-mono text-xs font-bold uppercase px-6 py-3 hover:bg-primary transition-colors cursor-pointer"
                  >
                    + Nova Turma
                  </button>
                </div>

                <div className="flex flex-col border border-tertiary-dark/20">
                  <div className="grid grid-cols-12 bg-foreground/5 p-4 border-b border-tertiary-dark/20 font-mono text-xs uppercase text-tertiary">
                    <div className="col-span-1">Turma</div>
                    <div className="col-span-3">Nome</div>
                    <div className="col-span-2">Estágio</div>
                    <div className="col-span-4">Horário</div>
                    <div className="col-span-2 text-right">Ações</div>
                  </div>

                  {classes.length === 0 ? (
                    <div className="p-8 text-center text-sm font-mono text-tertiary">
                      Nenhuma turma cadastrada no banco.
                    </div>
                  ) : (
                    classes.map((cls) => (
                      <div
                        key={cls.id}
                        className="grid grid-cols-12 p-4 border-b border-tertiary-dark/10 last:border-none text-sm items-center hover:bg-foreground/[0.01]"
                      >
                        <div className="col-span-1 font-display font-black text-xl text-primary/60">
                          {cls.number}
                        </div>
                        <div className="col-span-3 font-bold uppercase">{cls.title}</div>
                        <div className="col-span-2 text-xs font-mono text-tertiary">
                          {cls.subtitle}
                        </div>
                        <div className="col-span-4 text-xs font-mono text-foreground/80">
                          {cls.schedule}
                        </div>
                        <div className="col-span-2 text-right flex justify-end gap-2">
                          <button
                            onClick={() => openModal("class", cls)}
                            className="px-3 py-1.5 border border-tertiary-dark/30 hover:border-primary text-xs font-mono uppercase cursor-pointer"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteItem("class", cls.id)}
                            className="px-3 py-1.5 border border-red-500/30 hover:bg-red-500 hover:text-white text-red-400 text-xs font-mono uppercase cursor-pointer"
                          >
                            Excluir
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB HERO CONTENT */}
            {activeTab === "hero" && (
              <div className="flex flex-col gap-6 max-w-3xl">
                <div className="border-b border-tertiary-dark/20 pb-4">
                  <h2 className="text-3xl font-display font-bold uppercase">Textos da Landing Page</h2>
                  <p className="text-xs font-mono text-tertiary uppercase mt-1">
                    Hero Section e Apresentação
                  </p>
                </div>

                <form onSubmit={handleSaveHero} className="flex flex-col gap-6">
                  {/* Hero Title */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-tertiary uppercase tracking-widest">
                      Título Principal (Hero)
                    </label>
                    <input
                      type="text"
                      value={heroForm.hero_title}
                      onChange={(e) => setHeroForm((prev) => ({ ...prev, hero_title: e.target.value }))}
                      className="w-full bg-background border border-tertiary-dark/40 px-4 py-3 text-foreground font-mono text-sm focus:border-primary focus:outline-none transition-colors duration-300"
                    />
                  </div>

                  {/* Hero Subtitle */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-tertiary uppercase tracking-widest">
                      Subtítulo (Estilo)
                    </label>
                    <input
                      type="text"
                      value={heroForm.hero_subtitle}
                      onChange={(e) => setHeroForm((prev) => ({ ...prev, hero_subtitle: e.target.value }))}
                      className="w-full bg-background border border-tertiary-dark/40 px-4 py-3 text-foreground font-mono text-sm focus:border-primary focus:outline-none transition-colors duration-300"
                    />
                  </div>

                  {/* Hero Description */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-tertiary uppercase tracking-widest">
                      Descrição do Hero
                    </label>
                    <textarea
                      value={heroForm.hero_description}
                      rows={4}
                      onChange={(e) => setHeroForm((prev) => ({ ...prev, hero_description: e.target.value }))}
                      className="w-full bg-background border border-tertiary-dark/40 px-4 py-3 text-foreground font-mono text-sm focus:border-primary focus:outline-none transition-colors duration-300"
                    />
                  </div>

                  {/* Hero Image */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-tertiary uppercase tracking-widest">
                      Imagem de Destaque (Hero)
                    </label>

                    {heroForm.hero_image_url && (
                      <div className="w-48 aspect-[4/5] relative border border-tertiary-dark/20 p-2 mb-2">
                        <img
                          src={heroForm.hero_image_url}
                          alt="Hero Preview"
                          className="object-cover w-full h-full grayscale"
                        />
                      </div>
                    )}

                    <div className="flex gap-4 items-center">
                      <input
                        type="text"
                        placeholder="URL da Imagem ou faça upload"
                        value={heroForm.hero_image_url}
                        onChange={(e) => setHeroForm((prev) => ({ ...prev, hero_image_url: e.target.value }))}
                        className="flex-1 bg-background border border-tertiary-dark/40 px-4 py-3 text-foreground font-mono text-sm focus:border-primary focus:outline-none transition-colors duration-300"
                      />
                      <label className="bg-foreground text-background font-mono text-xs font-bold uppercase px-6 py-3.5 hover:bg-secondary hover:text-foreground transition-colors cursor-pointer text-center">
                        {uploadingImage ? "Enviando..." : "Upload Imagem"}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, "hero")}
                          className="hidden"
                          disabled={uploadingImage}
                        />
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="w-fit bg-foreground text-background font-bold tracking-widest uppercase px-8 py-4 border-2 border-foreground hover:bg-primary hover:border-primary hover:text-background transition-all duration-300 mt-4 cursor-pointer font-mono text-xs"
                  >
                    {actionLoading ? "Salvando..." : "Salvar Alterações"}
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </section>

      {/* CRUD Modal overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="w-full max-w-xl bg-background border-2 border-tertiary-dark/30 p-8 relative rounded-none shadow-2xl">
            {/* Glowing top line */}
            <div className="absolute -top-0.5 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-secondary" />

            <h3 className="text-2xl font-display font-bold uppercase mb-6 border-b border-tertiary-dark/10 pb-4">
              {editItem ? "Editar" : "Novo"} {modalType === "event" ? "Evento" : modalType === "class" ? "Turma" : "Espetáculo"}
            </h3>

            {/* EVENT FORM */}
            {modalType === "event" && (
              <form onSubmit={handleSaveEvent} className="flex flex-col gap-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-tertiary uppercase">Dia (ex: 12)</label>
                    <input
                      type="text"
                      required
                      value={eventForm.date_day}
                      onChange={(e) => setEventForm({ ...eventForm, date_day: e.target.value })}
                      className="bg-background border border-tertiary-dark/40 px-3 py-2 text-foreground font-mono text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-tertiary uppercase">Mês (ex: AGO)</label>
                    <input
                      type="text"
                      required
                      value={eventForm.date_month}
                      onChange={(e) => setEventForm({ ...eventForm, date_month: e.target.value })}
                      className="bg-background border border-tertiary-dark/40 px-3 py-2 text-foreground font-mono text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-tertiary uppercase">Ano (ex: 2026)</label>
                    <input
                      type="text"
                      required
                      value={eventForm.date_year}
                      onChange={(e) => setEventForm({ ...eventForm, date_year: e.target.value })}
                      className="bg-background border border-tertiary-dark/40 px-3 py-2 text-foreground font-mono text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono text-tertiary uppercase">Título</label>
                  <input
                    type="text"
                    required
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    className="bg-background border border-tertiary-dark/40 px-3 py-2 text-foreground font-mono text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono text-tertiary uppercase">Localização</label>
                  <input
                    type="text"
                    required
                    value={eventForm.location}
                    onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                    className="bg-background border border-tertiary-dark/40 px-3 py-2 text-foreground font-mono text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-tertiary uppercase">Tipo</label>
                    <select
                      value={eventForm.type}
                      onChange={(e) => setEventForm({ ...eventForm, type: e.target.value })}
                      className="bg-background border border-tertiary-dark/40 px-3 py-2 text-foreground font-mono text-sm"
                    >
                      <option value="Workshop">Workshop</option>
                      <option value="Competição">Competição</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-tertiary uppercase">Tema (opcional)</label>
                    <input
                      type="text"
                      value={eventForm.theme}
                      onChange={(e) => setEventForm({ ...eventForm, theme: e.target.value })}
                      className="bg-background border border-tertiary-dark/40 px-3 py-2 text-foreground font-mono text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-tertiary uppercase">Professor (opcional)</label>
                    <input
                      type="text"
                      value={eventForm.teacher}
                      onChange={(e) => setEventForm({ ...eventForm, teacher: e.target.value })}
                      className="bg-background border border-tertiary-dark/40 px-3 py-2 text-foreground font-mono text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-tertiary uppercase">Link Inscrição (opcional)</label>
                    <input
                      type="text"
                      value={eventForm.ticket_url}
                      onChange={(e) => setEventForm({ ...eventForm, ticket_url: e.target.value })}
                      className="bg-background border border-tertiary-dark/40 px-3 py-2 text-foreground font-mono text-sm"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 border border-tertiary-dark/40 font-mono text-xs uppercase hover:bg-foreground/5 cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="px-6 py-3 bg-foreground text-background font-mono text-xs font-bold uppercase hover:bg-primary transition-colors cursor-pointer"
                  >
                    {actionLoading ? "Salvando..." : "Salvar"}
                  </button>
                </div>
              </form>
            )}

            {/* CLASS FORM */}
            {modalType === "class" && (
              <form onSubmit={handleSaveClass} className="flex flex-col gap-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-tertiary uppercase">Número (ex: 01)</label>
                    <input
                      type="text"
                      required
                      value={classForm.number}
                      onChange={(e) => setClassForm({ ...classForm, number: e.target.value })}
                      className="bg-background border border-tertiary-dark/40 px-3 py-2 text-foreground font-mono text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-tertiary uppercase">Título/Nível</label>
                    <input
                      type="text"
                      required
                      value={classForm.title}
                      onChange={(e) => setClassForm({ ...classForm, title: e.target.value })}
                      className="bg-background border border-tertiary-dark/40 px-3 py-2 text-foreground font-mono text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-tertiary uppercase">Dificuldade/Estágio</label>
                    <input
                      type="text"
                      required
                      value={classForm.subtitle}
                      onChange={(e) => setClassForm({ ...classForm, subtitle: e.target.value })}
                      className="bg-background border border-tertiary-dark/40 px-3 py-2 text-foreground font-mono text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-tertiary uppercase">Horário</label>
                    <input
                      type="text"
                      required
                      value={classForm.schedule}
                      onChange={(e) => setClassForm({ ...classForm, schedule: e.target.value })}
                      className="bg-background border border-tertiary-dark/40 px-3 py-2 text-foreground font-mono text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-tertiary uppercase">Cor Contraste</label>
                    <select
                      value={classForm.accent_color}
                      onChange={(e) => setClassForm({ ...classForm, accent_color: e.target.value })}
                      className="bg-background border border-tertiary-dark/40 px-3 py-2 text-foreground font-mono text-sm"
                    >
                      <option value="primary">primary (Teal)</option>
                      <option value="secondary">secondary (Pink)</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono text-tertiary uppercase">Descrição</label>
                  <textarea
                    required
                    value={classForm.description}
                    rows={3}
                    onChange={(e) => setClassForm({ ...classForm, description: e.target.value })}
                    className="bg-background border border-tertiary-dark/40 px-3 py-2 text-foreground font-mono text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono text-tertiary uppercase">
                    Destaques (Separados por vírgula)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Sem pré-requisitos, A partir de 14 anos, Acolhedor"
                    value={classForm.highlightsRaw}
                    onChange={(e) => setClassForm({ ...classForm, highlightsRaw: e.target.value })}
                    className="bg-background border border-tertiary-dark/40 px-3 py-2 text-foreground font-mono text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono text-tertiary uppercase">Mensagem Whatsapp</label>
                  <input
                    type="text"
                    required
                    value={classForm.whatsapp_message}
                    onChange={(e) => setClassForm({ ...classForm, whatsapp_message: e.target.value })}
                    className="bg-background border border-tertiary-dark/40 px-3 py-2 text-foreground font-mono text-sm"
                  />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 border border-tertiary-dark/40 font-mono text-xs uppercase hover:bg-foreground/5 cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="px-6 py-3 bg-foreground text-background font-mono text-xs font-bold uppercase hover:bg-primary transition-colors cursor-pointer"
                  >
                    {actionLoading ? "Salvando..." : "Salvar"}
                  </button>
                </div>
              </form>
            )}

            {/* REPERTORY FORM */}
            {modalType === "repertory" && (
              <form onSubmit={handleSaveRepertory} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono text-tertiary uppercase">Título</label>
                  <input
                    type="text"
                    required
                    value={repertoryForm.title}
                    onChange={(e) => setRepertoryForm({ ...repertoryForm, title: e.target.value })}
                    className="bg-background border border-tertiary-dark/40 px-3 py-2 text-foreground font-mono text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono text-tertiary uppercase">Subtítulo (Repertório / Ano)</label>
                  <input
                    type="text"
                    required
                    value={repertoryForm.subtitle}
                    onChange={(e) => setRepertoryForm({ ...repertoryForm, subtitle: e.target.value })}
                    className="bg-background border border-tertiary-dark/40 px-3 py-2 text-foreground font-mono text-sm"
                  />
                </div>

                {/* Repertory Image */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono text-tertiary uppercase">Imagem do Espetáculo</label>

                  {repertoryForm.image_url && (
                    <div className="w-48 aspect-video relative border border-tertiary-dark/20 p-2 mb-1">
                      <img
                        src={repertoryForm.image_url}
                        alt="Repertory Preview"
                        className="object-cover w-full h-full grayscale"
                      />
                    </div>
                  )}

                  <div className="flex gap-4 items-center">
                    <input
                      type="text"
                      required
                      placeholder="URL ou faça upload"
                      value={repertoryForm.image_url}
                      onChange={(e) => setRepertoryForm({ ...repertoryForm, image_url: e.target.value })}
                      className="flex-1 bg-background border border-tertiary-dark/40 px-3 py-2 text-foreground font-mono text-sm"
                    />
                    <label className="bg-foreground text-background font-mono text-xs font-bold uppercase px-4 py-2.5 hover:bg-secondary hover:text-foreground transition-colors cursor-pointer text-center">
                      {uploadingImage ? "Enviando..." : "Upload"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, "repertory")}
                        className="hidden"
                        disabled={uploadingImage}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 border border-tertiary-dark/40 font-mono text-xs uppercase hover:bg-foreground/5 cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="px-6 py-3 bg-foreground text-background font-mono text-xs font-bold uppercase hover:bg-primary transition-colors cursor-pointer"
                  >
                    {actionLoading ? "Salvando..." : "Salvar"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

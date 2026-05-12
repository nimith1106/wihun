import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Cpu, Shield, Zap, Server, Globe } from 'lucide-react';

const RESOURCE_IMG = 'https://media.base44.com/images/public/69fb79b7748e5b3f3b5c5295/42d9f5808_generated_1208fcb5.png';

const categories = [
  {
    id: 'architecture',
    icon: Cpu,
    label: 'Architecture',
    title: 'System Architecture Overview',
    content: 'Our platform is built on a microservices architecture with event-driven communication patterns. Each service is independently deployable, horizontally scalable, and fault-tolerant. The core engine processes events through a distributed message queue, ensuring zero data loss and guaranteed delivery.',
    specs: [
      'Kubernetes-native deployment',
      'Event-sourced data model',
      'CQRS pattern implementation',
      'Multi-region failover',
    ],
  },
  {
    id: 'security',
    icon: Shield,
    label: 'Security',
    title: 'Security & Compliance Framework',
    content: 'Zero-trust architecture with defense-in-depth strategy. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). Our security operations center monitors 24/7 with automated threat response. Full audit logging and compliance reporting built-in.',
    specs: [
      'SOC2 Type II certified',
      'GDPR & CCPA compliant',
      'Penetration tested quarterly',
      'Role-based access control',
    ],
  },
  {
    id: 'performance',
    icon: Zap,
    label: 'Performance',
    title: 'Performance Benchmarks',
    content: 'Engineered for sub-50ms response times at the 99th percentile. Our CDN spans 200+ edge locations globally, with intelligent request routing and automatic cache invalidation. Load testing validated at 10x projected peak traffic.',
    specs: [
      'P99 latency: 47ms',
      'Global CDN: 200+ PoPs',
      'Auto-scaling: 0 to 10K in 30s',
      'Zero-downtime deployments',
    ],
  },
  {
    id: 'infrastructure',
    icon: Server,
    label: 'Infrastructure',
    title: 'Infrastructure & DevOps',
    content: 'Infrastructure-as-Code with GitOps workflows. Fully automated CI/CD pipelines with canary deployments and automatic rollback. Multi-cloud strategy with AWS, GCP, and Azure for maximum resilience and vendor independence.',
    specs: [
      'Terraform-managed infrastructure',
      'GitOps deployment pipeline',
      'Multi-cloud redundancy',
      'Automated disaster recovery',
    ],
  },
  {
    id: 'api',
    icon: Globe,
    label: 'API',
    title: 'API & Integration Layer',
    content: 'RESTful and GraphQL APIs with comprehensive documentation, SDKs for 8 languages, and a developer sandbox. WebSocket support for real-time data streaming. Rate limiting, authentication, and versioning built into the gateway.',
    specs: [
      'OpenAPI 3.0 specification',
      'SDKs: JS, Python, Go, Java, +4',
      'WebSocket & SSE streaming',
      'OAuth 2.0 & API key auth',
    ],
  },
];

export default function ResourceVault() {
  const [active, setActive] = useState('architecture');
  const activeCategory = categories.find((c) => c.id === active);

  return (
    <section id="resources" className="relative py-32">
      <div className="px-6 md:px-12 lg:px-24">
        <div className="hairline mb-20" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="font-mono text-xs text-volt tracking-widest uppercase">
            Technical Documentation
          </span>
          <h2 className="font-inter font-bold text-4xl md:text-6xl lg:text-7xl text-foreground mt-4 tracking-tighter">
            Resource
            <br />
            <span className="text-steel">Vault</span>
          </h2>
        </motion.div>
      </div>

      {/* Background image */}
      <div className="relative">
        <div className="absolute inset-0 opacity-10">
          <img src={RESOURCE_IMG} alt="Architectural vista" className="w-full h-full object-cover" />
        </div>

        <div className="relative px-6 md:px-12 lg:px-24 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left nav - sticky */}
            <div className="lg:col-span-3">
              <div className="lg:sticky lg:top-32 space-y-1">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActive(cat.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                        active === cat.id
                          ? 'bg-volt/10 text-volt border border-volt/20'
                          : 'text-steel hover:text-foreground hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-inter text-sm font-medium">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right content */}
            <div className="lg:col-span-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-iron/80 backdrop-blur-sm rounded-2xl border border-white/5 p-8 md:p-12"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-4 h-4 text-volt" />
                    <span className="font-mono text-xs text-volt tracking-widest uppercase">
                      {activeCategory.label}
                    </span>
                  </div>

                  <h3 className="font-inter font-bold text-2xl md:text-3xl text-foreground tracking-tight">
                    {activeCategory.title}
                  </h3>

                  <p className="font-inter text-steel text-base leading-relaxed mt-6">
                    {activeCategory.content}
                  </p>

                  <div className="mt-8 pt-6 border-t border-white/5">
                    <p className="font-mono text-xs text-steel tracking-widest uppercase mb-4">
                      Key Specifications
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeCategory.specs.map((spec) => (
                        <div
                          key={spec}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-obsidian/50 border border-white/5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-volt flex-shrink-0" />
                          <span className="font-mono text-sm text-foreground">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
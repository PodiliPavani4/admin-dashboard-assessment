import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export function PageHeader({ title, description, breadcrumbs = [], actions }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        {/* Breadcrumb Navigation */}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-1.5">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.label}>
                {idx > 0 && <ChevronRight size={12} />}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-slate-700 transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-slate-600 font-medium">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
        {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
      </div>

      {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
    </div>
  );
}

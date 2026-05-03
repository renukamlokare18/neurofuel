import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];
export type TableName = keyof Tables;
export type Row<T extends TableName> = Tables[T]["Row"];
export type Insert<T extends TableName> = Tables[T]["Insert"];
export type Update<T extends TableName> = Tables[T]["Update"];

export type ListOptions = {
  filters?: Record<string, unknown>;
  orderBy?: { column: string; ascending?: boolean };
  limit?: number;
  offset?: number;
};

// Generic CRUD wrapper. We intentionally use `any` to keep ergonomic generics
// without fighting Supabase's deeply nested table-name unions.
/* eslint-disable @typescript-eslint/no-explicit-any */
const sb = supabase as any;

export const db = {
  async list<T extends TableName>(table: T, opts: ListOptions = {}): Promise<Row<T>[]> {
    let q = sb.from(table).select("*");
    if (opts.filters) {
      for (const [k, v] of Object.entries(opts.filters)) {
        if (v !== undefined) q = q.eq(k, v);
      }
    }
    if (opts.orderBy) q = q.order(opts.orderBy.column, { ascending: opts.orderBy.ascending ?? true });
    if (opts.limit !== undefined) {
      const from = opts.offset ?? 0;
      q = q.range(from, from + opts.limit - 1);
    }
    const { data, error } = await q;
    if (error) throw error;
    return (data ?? []) as Row<T>[];
  },

  async getById<T extends TableName>(table: T, id: string): Promise<Row<T> | null> {
    const { data, error } = await sb.from(table).select("*").eq("id", id).maybeSingle();
    if (error) throw error;
    return data as Row<T> | null;
  },

  async create<T extends TableName>(table: T, values: Insert<T>): Promise<Row<T>> {
    const { data, error } = await sb.from(table).insert(values).select().single();
    if (error) throw error;
    return data as Row<T>;
  },

  async update<T extends TableName>(table: T, id: string, values: Update<T>): Promise<Row<T>> {
    const { data, error } = await sb.from(table).update(values).eq("id", id).select().single();
    if (error) throw error;
    return data as Row<T>;
  },

  async remove<T extends TableName>(table: T, id: string): Promise<void> {
    const { error } = await sb.from(table).delete().eq("id", id);
    if (error) throw error;
  },
};

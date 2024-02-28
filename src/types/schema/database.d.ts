import { type Typesaurus } from 'typesaurus';

import { type database } from '@/lib/database';

declare global {
  type Database = typeof database;
  type DatabaseSchema = Typesaurus.Schema<Database>;
}

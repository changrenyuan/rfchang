import { eq, desc, SQL } from 'drizzle-orm';
import { getDb } from 'coze-coding-dev-sdk';
import { consultations, users, insertConsultationSchema, insertUserSchema, type Consultation, type NewConsultation, type NewUser } from './shared/schema';

export class ConsultationManager {
  async createConsultation(data: NewConsultation & NewUser): Promise<Consultation> {
    const db = await getDb();
    const { email, name, phone, ...consultationData } = data;

    // 先创建或查找用户
    const [user] = await db.insert(users)
      .values({ email, name, phone })
      .onConflictDoUpdate({
        target: users.email,
        set: { name, phone }
      })
      .returning();

    // 创建咨询记录
    const validated = insertConsultationSchema.parse({
      ...consultationData,
      userId: user.id,
      name,
      email,
      phone
    });

    const [consultation] = await db.insert(consultations).values(validated).returning();
    return consultation;
  }

  async getConsultations(options: {
    skip?: number;
    limit?: number;
    status?: string;
  } = {}): Promise<Consultation[]> {
    const { skip = 0, limit = 100, status } = options;
    const db = await getDb();

    const conditions: SQL[] = [];

    if (status) {
      conditions.push(eq(consultations.status, status));
    }

    const query = db.select().from(consultations).orderBy(desc(consultations.createdAt)).limit(limit).offset(skip);

    if (conditions.length > 0) {
      return query.where(and(...conditions));
    }

    return query;
  }

  async getConsultationById(id: number): Promise<Consultation | null> {
    const db = await getDb();
    const [consultation] = await db.select().from(consultations).where(eq(consultations.id, id));
    return consultation || null;
  }

  async updateConsultationStatus(id: number, status: string): Promise<Consultation | null> {
    const db = await getDb();
    const [consultation] = await db
      .update(consultations)
      .set({ status })
      .where(eq(consultations.id, id))
      .returning();
    return consultation || null;
  }
}

export const consultationManager = new ConsultationManager();

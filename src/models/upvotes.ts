import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";

import { Feedback } from "./FeedBack";

@Entity("upvotes")
export class Upvote {
    @PrimaryGeneratedColumn("uuid")
    id!: string;   

    @ManyToOne(() => Feedback, (feedback) => feedback.id)
    @JoinColumn({ name: "feedback_id" }) // Foreign key for feedback
    feedback!: Feedback;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}

      
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";

import { Feedback } from "./FeedBack";

@Entity("comments")
export class Comment {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ManyToOne(() => Feedback, (feedback) => feedback.id)
    @JoinColumn({ name: "feedback_id" }) // Foreign key for feedback
    feedback!: Feedback;

    @Column({ type: "varchar", nullable: false })
    comment!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}

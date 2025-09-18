import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Comment } from "./comments";
export enum FeedbackCategory {
    BUG = "bug",
    FEATURE = "feature",
    IMPROVEMENT = "improvement",
    
}
@Entity("feedbacks")
export class Feedback {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({
        type: "enum",
        enum: FeedbackCategory,
        default: FeedbackCategory.BUG,
        //enumName: "feedback_category_enum" // ensures unique enum type name in PostgreSQL
    })
    category!: FeedbackCategory;
    @Column({ type: "varchar", nullable: false })
    title!: string;

    @Column({ type: "varchar", nullable: false })
    description!: string;
    @Column({ type: "decimal", precision: 10, scale: 0, nullable: false, default: 0 })
    upvotes!: number;
    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
    @ManyToOne(() => Comment, (comment) => comment.feedback, { nullable: true })
    @JoinColumn({ name: "comment_id" })
    comment?: Comment;
}

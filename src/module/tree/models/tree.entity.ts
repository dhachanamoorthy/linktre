import {
	AllowNull,
	AutoIncrement,
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	PrimaryKey,
	Table,
} from "sequelize-typescript";
import { users } from "../../user/models/users.entity";
@Table({
	tableName: "trees",
})
export class trees extends Model<trees> {
	@PrimaryKey
	@AllowNull(false)
	@AutoIncrement
	@Column({
		type: DataType.BIGINT,
	})
	id: number;

	@ForeignKey(() => users)
	@AllowNull(false)
	@Column({
		type: DataType.BIGINT,
	})
	user_id: number;

	@AllowNull(false)
	@Column({
		type: DataType.NOW,
	})
	tree_name: String;

	@AllowNull(false)
	@Column({
		type: DataType.NOW,
	})
	created_at: Date;

	@AllowNull(true)
	@Column({
		type: DataType.DATE,
	})
	updated_at: Date;

	@AllowNull(true)
	@Column({
		type: DataType.DATE,
	})
	deleted_at: Date;

	@BelongsTo(()=>users)
	users:users[]
}

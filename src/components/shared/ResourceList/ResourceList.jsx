import "./ResourceList.css";
import Button from "../Button/Button";

const ResourceList = ({
  items,
  getKey = (item) => item.id,
  getTitle = (item) => item.name,
  getAvatar = (item) => getTitle(item).charAt(0),
  renderSubtitle,
  renderDetails,
  onEdit,
  onDelete,
  variant = "default",
}) => (
  <div className={`resource-list resource-list--${variant}`}>
    {items.map((item) => (
      <article className="resource-list__card" key={getKey(item)}>
        <div className="resource-list__identity">
          <div className="resource-list__avatar">{getAvatar(item)}</div>

          <div>
            <h3>{getTitle(item)}</h3>
            {renderSubtitle?.(item)}
          </div>
        </div>

        {renderDetails?.(item)}

        <div className="resource-list__actions">
          <Button onClick={() => onEdit(item)}>Editar</Button>
          <Button variant="danger" onClick={() => onDelete(item)}>
            Eliminar
          </Button>
        </div>
      </article>
    ))}
  </div>
);

export default ResourceList;

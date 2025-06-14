import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";

import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);

  @media (max-width: 768px) {
    width: 4.8rem;
    transform: scale(1.2) translateX(-5px);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.8rem;

  @media (max-width: 768px) {
    gap: 0.4rem;

    button {
      padding: 0.4rem;
    }
  }
`;
function CabinRow({ cabin }) {
  // const [showForm, setShowForm] = useState(false);
  const { name, maxCapacity, regularPrice, discount, image, description } =
    cabin;
  const { isloading, mutate } = useDeleteCabin(name);
  const { isCreating, createCabin } = useCreateCabin();

  function handelDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <>
      <Table.Row role="row">
        <Img src={image} alt="" />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity}</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabin} />

              <Menus.List id={cabin}>
                <Menus.Button
                  onClick={handelDuplicate}
                  icon={<HiSquare2Stack />}
                  disabled={isCreating}
                >
                  Duplicate
                </Menus.Button>

                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="edit">
                <CreateCabinForm key={cabin.id} cabinToEdit={cabin} />
              </Modal.Window>

              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName={cabin.name}
                  disabled={isloading}
                  onConfirm={() => mutate(cabin.id)}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default CabinRow;

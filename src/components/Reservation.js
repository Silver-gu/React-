import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Reservation = () => {
    const { postId } = useParams();  // Access postId from the URL
    const [post, setPost] = useState(null);
    const [selectedSeat, setSelectedSeat] = useState(null); // Track selected seat
    const [userName, setUserName] = useState(''); // Track the name input
    const [reservationSuccess, setReservationSuccess] = useState(false); // Track reservation success
    const [loading, setLoading] = useState(true); // Track loading state for the post data

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`http://localhost:2002/getPost/${postId}`);
                const result = await res.json();

                if (result.success) {
                    setPost(result.post);
                } else {
                    alert('Failed to fetch post');
                }
            } catch (error) {
                console.error('Error fetching post:', error);
                alert('An error occurred while fetching the post');
            } finally {
                setLoading(false); // Set loading to false once the fetch is complete
            }
        };

        fetchPost();
    }, [postId]); // Dependency array ensures this effect runs whenever postId changes

    const handleSeatClick = (index) => {
        const seat = post.seats[index];
        if (seat) {
            // Seat is already reserved, prevent selecting
            alert("This seat is already reserved.");
            return;
        }
        setSelectedSeat(index);

    };

    const handleNameChange = (event) => {
        setUserName(event.target.value);
    };

    const handleReserveClick = async () => {
        if (!userName) {
            alert("Please enter your name.");
            return;
        }
        if (selectedSeat === null) {
            alert("Please select a seat first.");
            return;
        }

        try {
            const res = await fetch('http://localhost:2002/makeReservation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    postId,
                    seatIndex: selectedSeat,
                    userName
                })
            });

            const result = await res.json();
            console.log("API response:", result);

            if (result.success) {
                setReservationSuccess(true);
                const updatedPost = { ...post };
                updatedPost.seats[selectedSeat] = userName;
                setPost(updatedPost);
            } else {
                alert(`Reservation failed: ${result.message.message || "An unknown error occurred."}`);
            }
        } catch (error) {
            console.error("Error making reservation:", error);
            alert("An error occurred while reserving the seat.");
        }
    };

    if (loading) return <div>Loading...</div>; // Show loading state while fetching data

    // Fallback for when post.seats is undefined or null
    const seats = Array.isArray(post.seats) ? post.seats : [];

    return (
        <div>
            <div className="d-flex gap10 mb-3">
                <div className="grow1">
                    <img src={post.imageUrl} alt={post.title}/>
                </div>
                <div className="g-3   ">
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                </div>
            </div>

            <h3>Available Seats:</h3>
            {seats.length === 0 ? (
                <p>No seats available</p>
            ) : (
                <div className="d-flex wrap">
                {seats.map((seat, index) => {
                        let seatColor = 'grey';
                        let cursorStyle = 'pointer';

                        if (seat) {
                            seatColor = 'red'; // Reserved seats
                            cursorStyle = 'not-allowed';
                        } else if (selectedSeat === index) {
                            seatColor = 'orange';
                        }

                        return (
                            <div
                                key={index}
                                className="seat"
                                style={{
                                    backgroundColor: seatColor,
                                    width: '100px',
                                    height: '100px',
                                    margin: '2px',
                                    borderRadius: '5px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: cursorStyle
                                }}
                                onClick={() => handleSeatClick(index)} // Handle seat selection
                            >
                                <img
                                    className="chair"
                                    src="https://cdn-icons-png.freepik.com/512/85/85671.png"
                                    alt="seat"
                                    style={{width: '95px', height: '95px'}}
                                />
                            </div>
                        );
                    })}
                </div>
            )}

            {/* If a seat is selected, show name input and reserve button */}
            {selectedSeat !== null && !reservationSuccess && (
                <div className="mt-3">
                    <h4>Reserve this Seat</h4>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={userName}
                        onChange={handleNameChange}
                    />
                    <button className="m-2 reserveBnt" onClick={handleReserveClick}>Reserve Seat</button>
                </div>
            )}

            {/* If reservation is successful, show the reserved name on the seat */}
            {reservationSuccess && (
                <p>Your seat has been reserved successfully!</p>
            )}
        </div>
    );
};

export default Reservation;

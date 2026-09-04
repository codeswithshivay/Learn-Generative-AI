from transformers import pipeline

generator = pipeline(
    "image-text-to-text",
    model="google/t5gemma-2-270m-270m",
)

output = generator(
    None,
    # Explicitly using the image token since a chat template isn't available
    text="Your name is Ayush, What is your name?",
    generate_kwargs={"do_sample": False, "max_new_tokens": 50},
)

# Access the generated text directly from the list-wrapped output dictionary
print("\n", output[0]['generated_text'])
